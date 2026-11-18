import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div
          className="max-w-4xl mx-auto flex flex-col lg:flex-row 
                          justify-between">
          <div className="w-64">
            <Logo />
          </div>
        </div>
      </header>
      <section className="max-w-4xl mx-auto p-5 ">
        <Outlet />
      </section>
      <footer>
        <div className="py-5">
          <p className="text-center">
            Todos los derechos reservados <br />
            Aereopuertos y Servicios Auxiliares ASA <br />
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      <ToastContainer />
    </>
  )
}
