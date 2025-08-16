import { Api } from '../api/user.api';
import { handleApiError } from '../api/user.api';
//Models
import type { AdminModel } from '../model/admin.model';
//Dto
import type { UpdateAdminDto } from '../model/dto/admin.dto';

// Obtenemos todos los Profesores
export const getAdmin = async (): Promise<AdminModel[]> => {
    try {
        // console.log('Solicitando roles al seridor...');        
        const response = await Api.get('/admin');
        // console.log('Roles recibidos:', response.data);
        
        return response.data.map((admin: AdminModel) => ({
            ...admin,
            id: admin._id
        }));
    } catch (error) {
        throw handleApiError(error);
    };
};

//Obtener Profesores
export const getAdminById = async (): Promise<{ admin: AdminModel | null }> => {    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }
        const response = await Api.get('/admin/me-admin', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        //console.log('User profile response:', response.data)        
        return response.data;        
    } catch (error) {        
        throw handleApiError(error);        
    }
};

// Actualizar un Profesores
export const updateAdmin = async (id: string, admin: UpdateAdminDto ): Promise<AdminModel> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');
        const response = await Api.put(`/admin/${id}`, admin, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    };
};

// Eliminar un Profesores
export const deleteAdmin = async (id: string): Promise<void> => {
    try {
        await Api.delete(`/admin/${id}`);        
    } catch (error) {
        throw handleApiError(error);
    };
};