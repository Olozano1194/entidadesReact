import { Api } from '../api/user.api';
import { handleApiError } from '../api/user.api';
//Models
import type { Rol } from '../types/rol.models';
//Dto
import type { CreateRolDto } from '../types/dto/rol.dto';

// Obtenemos todos los roles
export const getRoles = async (): Promise<Rol[]> => {
    try {
        // console.log('Solicitando roles al seridor...');        
        const response = await Api.get('/roles');
        // console.log('Roles recibidos:', response.data);
        
        return response.data.map((rol: Rol) => ({
            ...rol,
            id: rol._id
        }));
    } catch (error) {
        throw handleApiError(error);
    };
};

//Obtener Rol
export const getRoleById = async (id: string): Promise<Rol> => {    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }
        const response = await Api.get(`/roles/${id}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        //console.log('User profile response:', response.data)        
        return response.data;        
    } catch (error) {
        throw handleApiError(error);        
    }
};

// Crear un nuevo rol
export const createRol = async (rol: CreateRolDto): Promise<Rol> => {
    try {
        const response = await Api.post('/roles', rol);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    };
};

// Actualizar un rol
export const updateRol = async (rol: Partial<CreateRolDto>, id: number): Promise<Rol> => {
    try {
        const response = await Api.put(`/roles/${id}`, rol);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    };
};

// Eliminar un rol
export const deleteRol = async (id: number): Promise<void> => {
    try {
        await Api.delete(`/roles/${id}`);        
    } catch (error) {
        throw handleApiError(error);
    };
};