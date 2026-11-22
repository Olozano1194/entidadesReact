

export interface Teacher {
    _id?: string;
    nombre: string;
    apellido: string;
    telefono: string;
    especialidad: string;
    email?: string;
    correo?: string;
    foto?: string;
    avatar?: string;
    departamento?: string;
    cargaAcademica?: string;
    contrato?: string;
    estado?: string;
    identificacion?: string | number;
    materias?: string[];
    grupos?: string;
    campus?: string;
    horasAsignadas?: number;
    horasTotales?: number;
    porcentajeCarga?: number;
};