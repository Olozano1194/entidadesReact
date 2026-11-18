// axios
import { Api } from "./user.api";
import { handleApiError } from "./user.api";
//Model
import type { MunicipalityModel } from "../types/municipality.model";

// function Municipality
export const getMunicipalityByDepto = async (idDepto: string): Promise<MunicipalityModel[]> => {    
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');

        const response = await Api.get(`/municipios/by-departamento`, {
            params: { departamento: idDepto, limit: 100 },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });        
               
        console.log('getMunicipalityByDepto response:', response.data);
        const data = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.data)
                ? response.data.data
                : Array.isArray(response.data?.municipios)
                    ? response.data.municipios
                    : [];
        return data;
    } catch (error) {
        throw handleApiError(error);
    }
};
//Lista de usuarios
export const getMunicipality = async (): Promise<MunicipalityModel[]> => {
    try {
        // console.log('Solicitando roles al seridor...');        
        const response = await Api.get('/municipios');
        // console.log('Roles recibidos:', response.data);
        
        return response.data.map((municipaly: MunicipalityModel) => ({
            ...municipaly,
            id: municipaly._id
        }));
    } catch (error) {
        throw handleApiError(error);
    };
};