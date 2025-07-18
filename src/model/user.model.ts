export interface User {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    repeatPassword?: string;
    rol?: string;
    idinstitucion?: number | null;
};