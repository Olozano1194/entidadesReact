export interface CreateRolDto {
    nombre: string;
    descripcion?: string;
    permisos: string[];
    activo?: boolean;
};