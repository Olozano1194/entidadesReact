export interface CreateInstitucionDto {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    director: string;
    id_departamento: string | { _id: string; descripcion: string };
    id_municipio: string;
    nosede: string;
    idestudiante: string[];
    iddocente: string[];
}