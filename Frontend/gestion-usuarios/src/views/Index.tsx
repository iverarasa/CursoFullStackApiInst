import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Links } from "react-router-dom";
import { deleteUser, findAll, save, update } from "../api/userapi";
import ListUser from "../components/users/ListUser";
import { toast } from "react-toastify";
import { useState } from "react";
import UserModal from "../components/users/UserModal";
import { findAllDepartamentos, findAllRoles } from "../api/catalogapi";
import type { CatalogosProps, User } from "../types";

export default function Index() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIserId, setSelectedUserId] = useState<User['id']>(0)

  const queryCient = useQueryClient();

  const {data: dataCatalogs} = useQuery<CatalogosProps>({
    queryKey: ["catalogs"],
    queryFn: async () => {
      const [roles, departamentos] = await Promise.all([
        findAllRoles(),
        findAllDepartamentos()
      ]);
      return {roles, departamentos};
    }
  })

  const { data: usersPaginate, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => findAll()
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onError: () => {

    },
    onSuccess: () => {
      queryCient.invalidateQueries({ queryKey: ["users"] })
      toast.success("El usuario se eliminó correctamente")
    }
  });

  const saveMutation = useMutation({
    mutationFn: save,
    onError: () => {
      toast.error("Hubo un error al guardar el usuario")
    },
    onSuccess: () => {
      queryCient.invalidateQueries({ queryKey: ["users"] })
      toast.success("El usuario se guardó correctamente")
      setIsModalOpen(false)
    }
  });

  const editMutation = useMutation({
    mutationFn: update,
    onError: (error) => {
      toast.error("Hubo un error al actualizar el usuario: " + error.message)
    },
    onSuccess: () => {
      queryCient.invalidateQueries({ queryKey: ["users"] })
      toast.success("El usuario se actualizó correctamente")
      setIsModalOpen(false)
    }
  });

  return (
    <main className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Usuarios
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Listado de usuarios registrados.
          </p>
        </div>
        <button
          className="shrink-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => { setIsModalOpen(true) }}
          type="button"
        >
          Agregar usuario
        </button>
      </div>
      {
        isModalOpen && (
          <UserModal
            dataCatalogs={dataCatalogs} 
            saveMutation={saveMutation}
            editMutation={editMutation}
            selectedUserId={selectedIserId}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedUserId(undefined)
            }}/>
        )
      }
      <ListUser users={usersPaginate?.content}
        isError={isError}
        isLoading={isLoading}
        deleteMutation={deleteMutation}
        setIsModalOpen={setIsModalOpen}
        setSelectedUserId={setSelectedUserId}
      />
    </main>
  );
}