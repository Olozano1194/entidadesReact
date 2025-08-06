
export interface MunicipalityModel {
    _id?: string;
    id_municipio?: string;
    descripcion: string;
    id_departamento: string | { _id: string; descripcion: string };
}