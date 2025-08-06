// axios
import { Api } from "./user.api";
import { handleApiError } from "./user.api";
//Model
import type { MunicipalityModel } from "../model/municipality.model";

// function Municipality
export const getMunicipalityByDepto = async (idDepto: string): Promise<MunicipalityModel[]> => {    
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');

        const response = await Api.get(`/municipios/by-departamento`, {
            params: { departamento: idDepto },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });        
               
        return response.data;        
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