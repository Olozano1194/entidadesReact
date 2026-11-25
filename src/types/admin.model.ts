export interface AdminModel {
    _id?: string;
    id_usuario?: string | { _id?: string };
    email?: string;
    nombre: string;
    apellido: string;
    telefono: string;
    cargo: string;
    biografia?: string;
};