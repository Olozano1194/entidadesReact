import type { Rol } from "../rol.models";

export interface CreateUserDto {
    email: string;
    password: string;
    rol: Rol | string;
    fotoPerfil?: { url: string, publicId: string };
    idinstitucion?: number | null;
};

export interface LoginUserDto {
    email: string;
    password: string;    
};