export interface Rol {
    _id: string;
    nombre: string;
    descripcion?: string;
    permisos?: string[];
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
};