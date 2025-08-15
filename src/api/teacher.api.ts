import { Api } from '../api/user.api';
import { handleApiError } from '../api/user.api';
//Models
import type { Teacher } from '../model/teacher.model';
//Dto
import type { UpdateTeacherDto } from '../model/dto/teacher.dto';

// Obtenemos todos los Profesores
export const getTeacher = async (): Promise<Teacher[]> => {
    try {
        // console.log('Solicitando roles al seridor...');        
        const response = await Api.get('/profesor');
        // console.log('Roles recibidos:', response.data);
        
        return response.data.map((teacher: Teacher) => ({
            ...teacher,
            id: teacher._id
        }));
    } catch (error) {
        throw handleApiError(error);
    };
};

//Obtener Profesores
export const getTeacherById = async (): Promise<{ teacher: Teacher | null }> => {    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }
        const response = await Api.get('/profesor/me-teacher', {
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
export const updateTeacher = async (id: string, teacher: UpdateTeacherDto ): Promise<Teacher> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');
        const response = await Api.put(`/profesor/${id}`, teacher, {
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
        await Api.delete(`/profesor/${id}`);        
    } catch (error) {
        throw handleApiError(error);
    };
};