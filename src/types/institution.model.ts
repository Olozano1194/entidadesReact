export interface InstitucionModel {
    _id?: string;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    director: string;
    iddepartamento: string;
    idmunicipio: string;
    nosedes: string;
    estudiantes: string[];
    profesores: string[];
    asignarTodosStudent?: boolean;
    asignarTodosTeacher?: boolean;
}