import { createColumnHelper } from '@tanstack/react-table';
import type { Rol } from '../../../../types/rol.models';

const columnHelper = createColumnHelper<Rol>();

export const getRoleColumns = () => [
    columnHelper.accessor((_, index) => index + 1, {
        id: 'index',
        header: 'N°',
        cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor(row => row.nombre, {
        id: 'nombre',
        header: 'Nombre del Rol',
        cell: ({ row }) => {
            const r = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-fixed/30 flex items-center justify-center text-primary">
                        <span className="font-display-xl text-lg font-bold">{r.nombre?.[0]?.toUpperCase() ?? 'R'}</span>
                    </div>
                    <div>
                        <div className="font-label-bold text-label-bold text-on-surface">{r.nombre}</div>
                        {r.descripcion && (
                            <div className="font-label-sm text-label-sm text-outline truncate max-w-[200px]">{r.descripcion}</div>
                        )}
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor(row => row.descripcion, {
        id: 'descripcion',
        header: 'Descripción',
    }),
    columnHelper.accessor(row => row.permisos, {
        id: 'permisos',
        header: 'Permisos',
        cell: ({ row }) => {
            const permisos = row.original.permisos ?? [];
            return (
                <div className="flex flex-wrap gap-1">
                    {permisos.slice(0, 3).map((p: string, i: number) => (
                        <span key={i} className="bg-surface-container px-2 py-0.5 rounded text-[11px] font-label-bold text-on-surface-variant">{p}</span>
                    ))}
                    {permisos.length > 3 && (
                        <span className="bg-surface-container px-2 py-0.5 rounded text-[11px] font-label-bold text-on-surface-variant">+{permisos.length - 3}</span>
                    )}
                    {permisos.length === 0 && <span className="text-outline text-label-sm">—</span>}
                </div>
            );
        },
    }),
    columnHelper.accessor(row => row.activo, {
        id: 'estado',
        header: 'Estado',
        cell: ({ row }) => {
            const activo = row.original.activo;
            return (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ${activo ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    <span className={`w-2 h-2 rounded-full ${activo ? 'bg-tertiary' : 'bg-outline'}`}></span>
                    {activo ? 'Activo' : 'Inactivo'}
                </span>
            );
        },
    }),
];
