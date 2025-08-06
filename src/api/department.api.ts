// axios
import { Api } from "./user.api";
import { handleApiError } from "./user.api";
//Model
import type { DepartamentModel } from "../model/department.model";


//Lista de usuarios
export const getDepartment = async (): Promise<DepartamentModel[]> => {
    try {
        // console.log('Solicitando roles al seridor...');        
        const response = await Api.get('/departamentos');
        // console.log('Roles recibidos:', response.data);
        
        return response.data.map((departament: DepartamentModel) => ({
            ...departament,
            id: departament._id
        }));
    } catch (error) {
        throw handleApiError(error);
    };
};