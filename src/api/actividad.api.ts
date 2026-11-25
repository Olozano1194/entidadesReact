import { Api } from '../api/user.api';
import { handleApiError } from '../api/user.api';

export interface Actividad {
    id: string;
    tipo: string;
    descripcion: string;
    fecha: string;
}

export const getActividades = async (): Promise<Actividad[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await Api.get('/actividades', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.data)
                ? response.data.data
                : [];
        return data;
    } catch (error) {
        throw handleApiError(error);
    }
};
