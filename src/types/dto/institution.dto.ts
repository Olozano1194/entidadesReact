export interface CreateInstitucionDto {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    director: string;
    iddepartamento: string | { _id: string; descripcion: string };
    idmunicipio: string;
    nosedes: number;
    estudiantes: string[];
    profesores: string[];
}