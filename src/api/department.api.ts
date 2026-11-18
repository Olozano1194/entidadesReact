// axios
import { Api } from "./user.api";
import { handleApiError } from "./user.api";
//Model
import type { DepartamentModel } from "../types/department.model";


//Lista de usuarios
export const getDepartment = async (): Promise<DepartamentModel[]> => {
    try {
        // console.log('Solicitando roles al seridor...');        
        // limit=100 to fetch all 33 Colombian departments in one request (default is 20)
        const response = await Api.get('/departamentos', { params: { limit: 100 } });
        const data = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.data)
                ? response.data.data
                : Array.isArray(response.data?.departamentos)
                    ? response.data.departamentos
                    : [];
        return data.map((departament: DepartamentModel) => ({
            ...departament,
            id: departament._id
        }));
    } catch (error) {
        throw handleApiError(error);
    };
};