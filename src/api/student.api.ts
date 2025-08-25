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
        const response = await Api.get('/estudiante', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log('Roles recibidos:', response.data);
        
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    };
};

//Obtener Estudiante
export const getStudentById = async (): Promise<{ student: Student | null }> => {    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }
        const response = await Api.get('/estudiante/me-student', {
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

// Actualizar un Estudiante
export const updateStudent = async (id: string, student: UpdateStudentDto ): Promise<Student> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');
        const response = await Api.put(`/estudiante/${id}`, student, {
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
        await Api.delete(`/estudiante/${id}`);        
    } catch (error) {
        throw handleApiError(error);
    };
};