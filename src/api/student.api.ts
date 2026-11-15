import { Api } from '../api/user.api';
import { handleApiError } from '../api/user.api';
//Models
import type { Student } from '../types/student.model';
//Dto
import type { UpdateStudentDto } from '../types/dto/student.dto';

// Obtenemos todos los Estudiantes
export const getStudent = async (): Promise<Student[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await Api.get('/estudiantes', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.data)
                ? response.data.data
                : Array.isArray(response.data?.estudiantes)
                    ? response.data.estudiantes
                    : [];
        return data;
    } catch (error) {
        throw handleApiError(error);
    }
};

//Obtener Estudiante (no existe endpoint "me" en el backend, retorna null)
export const getStudentById = async (): Promise<{ student: Student | null }> => {
    return { student: null };
};

// Actualizar un Estudiante
export const updateStudent = async (id: string, student: UpdateStudentDto ): Promise<Student> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');
        const response = await Api.put(`/estudiantes/${id}`, student, {
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

// Eliminar un Estudiante
export const deleteStudent = async (id: string): Promise<void> => {
    try {
        await Api.delete(`/estudiantes/${id}`);        
    } catch (error) {
        throw handleApiError(error);
    };
};