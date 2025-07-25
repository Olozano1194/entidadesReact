import type { Rol } from "../rol.models";

export interface CreateUserDto {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol: Rol;
    idinstitucion?: number | null;
};

export interface LoginUserDto {
    email: string;
    password: string;    
};