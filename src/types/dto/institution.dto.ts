export interface CreateInstitucionDto {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    director: string;
    iddepartamento: string;
    idmunicipio: string;
    nosedes: number;
    estudiantes: string[];
    profesores: string[];
}

export interface ListInstitucionDto {
    _id?: string;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    director: string;
    nosedes: string;
    iddepartamento?: string | {
        _id: string;
        descripcion: string;
    };
    idmunicipio?: string | {
        _id: string;
        descripcion: string;
    };
    estudiantes?: Array<{
        _id: string;
        nombre: string;
        apellido: string;
    }>;
    profesores?: Array<{
        _id: string;
        nombre: string;
        apellido: string;
        especialidad: string;
    }>
    asignarTodosStudent?: boolean;
    asignarTodosTeacher?: boolean;
}