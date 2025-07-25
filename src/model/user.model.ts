import type { Rol } from "./rol.models";

export interface User {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    repeatPassword?: string;
    rol: Rol;
    idinstitucion?: number | null;
};