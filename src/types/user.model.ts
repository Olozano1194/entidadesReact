import type { Rol } from "./rol.models";

export interface User {
    _id?: string;
    email: string;
    password: string;
    repeatPassword?: string;
    rol: Rol | string;
    fotoPerfil?: { url: string, publicId: string };
    idinstitucion?: number | null;
    id?: string;
};