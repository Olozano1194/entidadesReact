import { Api } from '../api/user.api';
import { handleApiError } from '../api/user.api';
//Models
import type { AdminModel } from '../types/admin.model';
//Dto
import type { UpdateAdminDto } from '../types/dto/admin.dto';

// Obtenemos todos los administradores
export const getAdmin = async (): Promise<AdminModel[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await Api.get('/administradores', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.data)
                ? response.data.data
                : Array.isArray(response.data?.administradores)
                    ? response.data.administradores
                    : [];
        return data.map((admin: AdminModel) => ({ ...admin, id: admin._id }));
    } catch (error) {
        throw handleApiError(error);
    }
};

//Obtener Administrador (no existe endpoint "me" en el backend, retorna null)
export const getAdminById = async (): Promise<{ admin: AdminModel | null }> => {
    return { admin: null };
};

// Actualizar un Administrador
export const updateAdmin = async (id: string, admin: UpdateAdminDto): Promise<AdminModel> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');
        const response = await Api.put(`/administradores/${id}`, admin, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// Eliminar un Administrador
export const deleteAdmin = async (id: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        await Api.delete(`/administradores/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
    } catch (error) {
        throw handleApiError(error);
    }
};