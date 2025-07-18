import axios from 'axios';
//import type { AxiosResponse } from 'axios';
//Model
import type { User } from "../model/user.model";
//Dto
import type { CreateUserDto } from "../model/dto/user.dto";
import type { LoginUserDto } from '../model/dto/user.dto';


export const Api = axios.create({
    baseURL: 'http://localhost:5000/api',
    // baseURL: import.meta.env.MODE === 'development' 
    // ? 'http://localhost:5000/api'
    // : 'https://gimnasioreactdjango.onrender.com/gym/api/v1',
    headers: {
        'Content-Type': 'application/json',       
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
        // Asegúrate de que idinstitucion sea un número o null
        //const idinstitucion = userData.idinstitucion === 'recepcion' ? null : Number(userData.idinstitucion);
        //console.log('Datos a enviar:', userData);        

        const requestData = {
            nombre: userData.nombre,
            apellido: userData.apellido,
            email: userData.email,
            password: userData.password,
            rol: userData.rol || 'estudiante',
            idinstitucion: userData.idinstitucion
        };

        //console.log('Enviando datos:', requestData);

        const response = await Api.post('/usuario', requestData);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error: any) {
        console.error('Error detallado:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });

        // Mejorar el mensaje de error
        const errorMessage = error.response?.data?.message || 
                           'Error al crear el usuario';
        throw new Error(errorMessage);
    }
};

//Inicio de sesión
export const login = async (credentials: LoginUserDto) => {
  try {
      const response = await Api.post('/login/', credentials);            
      return response.data;      
  } catch (error) {      
      throw handleApiError(error);      
  }  
}

//function profile
export const getUserProfile = async (): Promise<{user: User}> => {
    //const token = localStorage.getItem('token');
    try {
        const response = await Api.get(`/me/`) //, {
        //     headers: {
        //         'Authorization': `Token ${token}`
        //         },
        //     }
        // );
        //console.log('User profile response:', response.data)        
        return response.data;        
    } catch (error) {
        throw handleApiError(error);        
    }
};

//Lista de usuarios
export const getUsers = async () => {
    //const token = localStorage.getItem('token');
    try {
        const response = await Api.get<User[]>('/usuario/') //, {
            // headers: {
            //     'Authorization': `Token ${token}`
            //     },
            // }
        //);
        //console.log('Users response:', response.data);        
        return response.data;        
    } catch (error) {
        throw handleApiError(error);        
    }
};

//Actualizar Usuario
export const updateUser = async (id: number, user: CreateUserDto): Promise<User> => {
    //const token = localStorage.getItem('token');
    //const formData = new FormData();

    // if (user.nombre) formData.append('nombre', user.nombre);
    // if (user.apellido) formData.append('apellido', user.apellido);
    // if (typeof user.idrole === 'string') formData.append('idrole', user.idrole);        

    try {
        const response = await Api.put<User>(`/usuario/${id}/`, user) //, {
        //     headers: {
        //         'Authorization': `Token ${token}`,
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });
        return response.data;        
    } catch (error) {
        throw handleApiError(error);             
    }    
}