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

export interface ListUserDto {
    _id?: string;
    email: string;
    rol: Rol | string;
    nombre?: string;
    apellido?: string;     
}