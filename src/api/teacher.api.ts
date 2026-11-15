import { Api } from '../api/user.api';
import { handleApiError } from '../api/user.api';
//Models
import type { Teacher } from '../types/teacher.model';
//Dto
import type { UpdateTeacherDto } from '../types/dto/teacher.dto';

// Obtenemos todos los Profesores
export const getTeacher = async (): Promise<Teacher[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await Api.get('/profesores', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.data)
                ? response.data.data
                : Array.isArray(response.data?.profesores)
                    ? response.data.profesores
                    : [];
        return data;
    } catch (error) {
        throw handleApiError(error);
    }
};

//Obtener Profesor (no existe endpoint "me" en el backend, retorna null)
export const getTeacherById = async (): Promise<{ teacher: Teacher | null }> => {
    return { teacher: null };
};

// Actualizar un Profesores
export const updateTeacher = async (id: string, teacher: UpdateTeacherDto ): Promise<Teacher> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');
        const response = await Api.put(`/profesores/${id}`, teacher, {
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
export const deleteTeacher = async (id: string): Promise<void> => {
    try {
        await Api.delete(`/profesores/${id}`);        
    } catch (error) {
        throw handleApiError(error);
    };
};