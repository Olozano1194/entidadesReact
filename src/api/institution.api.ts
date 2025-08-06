// axios
import { Api } from "./user.api";
import { handleApiError } from "./user.api";
//Model
import type { InstitucionModel } from "../model/institution.model";
//Dto
import type { CreateInstitucionDto } from "../model/dto/institution.dto";


// Creamos el usuario
export const CreateInstitution = async (userData: CreateInstitucionDto) => {
    try {                
        const requestData = {
            nombre: userData.nombre,
            direccion: userData.direccion,
            email: userData.email,
            telefono: userData.telefono,
            director: userData.director,
            departamento: userData.iddepartamento,
            municipio: userData.idmunicipio,
            sede: userData.nosede,
            estudiante: userData.idestudiante,
            docente: userData.iddocente,
        };

        // console.log('Enviando datos:', requestData);

        const response = await Api.post('/instituciones', requestData);
        // console.log('Respuesta del back:', response.data);
        

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {        
        // console.error('Error detallado:', {
        //     message: error.message,
        //     response: error.response?.data,
        //     status: error.response?.status
        // });
        throw handleApiError(error);

        // Mejorar el mensaje de error
        //const errorMessage = error.response?.data?.message || 
        //                   'Error al crear el usuario';
        
    }
};

//function profile
export const getInstitutionProfile = async (): Promise<{ user: InstitucionModel }> => {    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }
        const response = await Api.get(`/instituciones/me`, {
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

//Lista de usuarios
export const getInstitutions = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await Api.get<InstitucionModel[]>('/instituciones', {
            headers: {
                'Authorization': `Bearer ${token}`
                },
            }
        );
        //console.log('Users response:', response.data);        
        return response.data;        
    } catch (error) {
        throw handleApiError(error);        
    }
};

//Actualizar Usuario
export const updateRol = async (rol: Partial<CreateInstitucionDto>, id: string): Promise<InstitucionModel> => {
    try {
        const response = await Api.put(`/instituciones/${id}`, rol);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    };
};