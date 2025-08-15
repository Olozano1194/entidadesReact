import axios from 'axios';
//import type { AxiosResponse } from 'axios';
//Model
import type { User } from "../model/user.model";
import type { Rol } from '../model/rol.models';
//Dto
import type { CreateUserDto } from "../model/dto/user.dto";
import type { LoginUserDto } from '../model/dto/user.dto';


export const Api = axios.create({
    baseURL: 'http://localhost:5000/api',
    // baseURL: import.meta.env.MODE === 'development' 
    // ? 'http://localhost:5000/api'
    // : 'https://gimnasioreactdjango.onrender.com/gym/api/v1',
    headers: {
        // 'Content-Type': 'application/json',       
    },    
});

// Solo para debugging
// Api.interceptors.request.use(
//     (config) => {
//         console.log('Request:', {
//             method: config.method,
//             url: config.url,
//             data: config.data,
//             headers: config.headers
//         });
//         return config;
//     },
//     (error) => {
//         console.error('Request Error:', error);
//         return Promise.reject(error);
//     }
// );

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message;
    console.error('API Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error(errorMessage);
  }
  console.error('Unknown error:', error);
  throw new Error('Ocurrió un error desconocido');
};

// Creamos el usuario
export const CreateUsers = async (userData: CreateUserDto) => {
    try {                
        const requestData = {            
            email: userData.email,
            password: userData.password,
            rol: userData.rol,
            idinstitucion: userData.idinstitucion
        };

        // console.log('Enviando datos:', requestData);

        const response = await Api.post('/usuario', requestData);
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

// Inicio de sesión
export const login = async (credentials: LoginUserDto) => {
    try {
        // console.log('Intentando login con:', credentials);
        
        const response = await Api.post('/usuario/login', credentials);
        // console.log('Respuesta del servidor:', response.data);

        if (response.data.token && response.data.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));            
        }        
                    
        return response.data;
        
    }catch (error) {      
        throw handleApiError(error);      
    }
}

// function profile
export const getUserProfile = async (): Promise<{ user: User & { rol?: Rol } }> => {    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }
        const response = await Api.get(`/usuario/me`, {
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

// Lista de usuarios
export const getUsers = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await Api.get<User[]>('/usuario', {
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

// Actualizar Usuario
export const updateUser = async (id: string, formData: FormData): Promise<User> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');

        // console.log('Enviamos datos de actualización:', {
        //     id,
        //     formData: Object.fromEntries(formData.entries())
        // });        

        const response = await Api.put(`/usuario/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data.usuario;
    } catch (error) {
        throw handleApiError(error);             
    }    
}