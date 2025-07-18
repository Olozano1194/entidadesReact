export interface CreateUserDto {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol?: string;
    idinstitucion?: number | null;
};

export interface LoginUserDto {
    email: string;
    password: string;    
};