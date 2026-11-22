export interface Student {
    _id?: string;
    nombre: string;
    apellido: string;
    fechanacimiento: Date;
    telefono: string;
    direccion: string;
    identificacion?: number;
    acudiente?: string;
    estadoMatricula?: string;
    desempeño?: number;
    nivel?: string;
    salones?: number | string;
    curso?: string;
};