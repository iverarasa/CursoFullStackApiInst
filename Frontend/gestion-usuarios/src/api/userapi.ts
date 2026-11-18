import api from "../helper/axios";
import { paginatedUsersSchema, userSchema, type User, type UserFormType } from "../types";

const END_POINT = '/usuario';

export async function findAll(pageNumber = 0) {
    try {
        
        const {data} = await api.get(
            `${END_POINT}/paginate`,
            { params: {pageNumber: pageNumber}}
        );
        const response = paginatedUsersSchema.safeParse(data);

        if (response.success) {
            return response.data
        }
    } catch (error) {
        
    }
}

export async function findById(id: User['id']) {
    try {
        
        const {data} = await api.get(
            `${END_POINT}/${id}`
        );
        const response = userSchema.safeParse(data);

        if (response.success) {
            return response.data
        }
    } catch (error) {
        
    }
}

export async function deleteUser(id: User['id']) {
    try {
        
        /*const {data} = */await api.delete(
            `${END_POINT}/${id}`
        );
    } catch (error) {
        
    }
}

export async function save(formData: UserFormType) {
    try {
        const {data} = await api.post(`${END_POINT}`, formData);
        return data;
    } catch (error) {
        
    }
}

export async function update(formData: UserFormType) {
    try {
        console.log("Entraa update");
        const id = (formData.id !== 0) ? `${formData.id}` : '';
        const {data} = await api.put(
            `${END_POINT}/${id}`, formData);
        return data;
    } catch (error) {
        
    }
}