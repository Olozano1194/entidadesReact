export interface Rol {
    _id: string;
    nombre: string;
    descripcion?: string;
    permisos?: string[];
    activo: boolean;
    nivel?: string;
    // createdAt: Date;
    // updatedAt: Date;
};