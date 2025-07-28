import type { Rol } from "./rol.models";

export interface User {
    _id?: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    repeatPassword?: string;
    rol: Rol | string;
    idinstitucion?: number | null;
};