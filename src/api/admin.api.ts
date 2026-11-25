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

//Obtener Administrador por usuario logueado
export const getAdminById = async (): Promise<{ admin: AdminModel | null }> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return { admin: null };
        const response = await Api.get('/administradores/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const profile = response.data?.data?.profile ?? response.data?.profile ?? response.data?.data ?? null;
        return { admin: profile };
    } catch {
        // Fallback por si el backend aún no está reiniciado con /me
        try {
            const admins = await getAdmin();
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = storedUser?._id || storedUser?.id;
            let found = null;
            if (userId) {
                found = admins.find((a) => {
                    const adminUserId = typeof a.id_usuario === 'object' && a.id_usuario !== null
                        ? (a.id_usuario as { _id?: string })._id
                        : a.id_usuario;
                    return adminUserId === userId;
                });
            }
            if (!found && storedUser?.email) {
                found = admins.find((a) => a.email === storedUser.email);
            }
            return { admin: found ?? null };
        } catch {
            return { admin: null };
        }
    }
};

// Actualizar un Administrador
export const updateAdmin = async (id: string, admin: UpdateAdminDto): Promise<AdminModel> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');
        const response = await Api.put(`/administradores/${id}`, admin, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data?.data ?? response.data;
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