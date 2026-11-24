import { createColumnHelper } from '@tanstack/react-table';
import type { ListUserDto } from '../../../../types/dto/user.dto.ts'

const columnHelper = createColumnHelper<ListUserDto>();

export const getUserColumns = () => [
    columnHelper.accessor((_, index) => index + 1, {
        id: 'index',
        header: 'N°',
        cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor(row => `${row.nombre} ${row.apellido}`, {
        id: 'usuario',
        header: 'Usuario y Credenciales',
        cell: ({ row }) => {
            const t = row.original;
            const photo = t.foto || t.avatar;
            const initials = `${t.nombre?.[0] ?? ''}${t.apellido?.[0] ?? ''}`.toUpperCase();
            return (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary font-display-xl text-lg font-bold">
                        {photo ? (
                            <img src={photo} alt={`${t.nombre} ${t.apellido}`} className="h-12 w-12 rounded-xl object-cover" />
                        ) : (
                            initials
                        )}
                    </div>
                    <div>
                        <div className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                            {t.nombre} {t.apellido}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
                            <span className="text-outline">{t.email ?? '—'}</span>
                        </div>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor(row => row.rol, {
        id: 'rol',
        header: 'Rol Asignado',
        cell: ({ row }) => {
            const t = row.original;
            const rolValue = typeof t.rol === 'object' && t.rol !== null ? (t.rol as { nombre?: string }).nombre ?? '' : String(t.rol ?? '');
            const roles = Array.isArray(t.rol) ? t.rol.map((r) => (typeof r === 'object' && r !== null ? (r as { nombre?: string }).nombre ?? '' : String(r))) : [rolValue];
            const getRolColor = (rol: string) => {
                const r = rol.toLowerCase();
                if (r.includes('super') || r.includes('admin')) return 'bg-primary text-on-primary border-primary';
                if (r.includes('docente') || r.includes('profesor')) return 'bg-surface-container-high text-on-surface-variant border-outline-variant';
                if (r.includes('estudiante') || r.includes('alumno')) return 'bg-emerald-50/50 text-on-tertiary-fixed border-tertiary-fixed/50';
                if (r.includes('secretaria') || r.includes('secretario')) return 'bg-secondary-container text-on-secondary-container border-secondary-container';
                if (r.includes('acudiente')) return 'bg-secondary-fixed text-on-secondary-fixed border-secondary-fixed';
                return 'bg-surface-container text-on-surface-variant border-outline-variant';
            };
            return (
                <div className="flex flex-col items-start gap-1.5">
                    {roles.filter(Boolean).map((rol, i) => (
                        <span
                            key={i}
                            className={`inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm font-bold border ${getRolColor(rol)}`}
                        >
                            {rol}
                        </span>
                    ))}
                    {roles.filter(Boolean).length === 0 && (
                        <span className="text-outline font-label-sm text-label-sm">—</span>
                    )}
                </div>
            );
        },
    }),
    columnHelper.accessor(row => row.institucion, {
        id: 'institucion',
        header: 'Institución / Sede',
    }),
    columnHelper.accessor(row => row.ultimoAcceso, {
        id: 'ultimoAcceso',
        header: 'Último Acceso',
        cell: ({ row }) => {
            const v = row.original.ultimoAcceso;
            if (!v) return '—';
            try {
                const d = new Date(v);
                if (isNaN(d.getTime())) return String(v);
                return d.toLocaleString('es-CO', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
            } catch {
                return String(v);
            }
        },
    }),
    // columnHelper.accessor(row => row.cargaAcademica, {
    //     id: 'cargaAcademica',
    //     header: 'Carga Académica',
    //     cell: ({ row }) => {
    //         const t = row.original;
    //         const horas = t.horasAsignadas ?? 0;
    //         const total = t.horasTotales ?? 0;
    //         const pct = total > 0 ? (horas / total) * 100 : 0;
    //         const grupos = t.grupos ?? '';
    //         const campus = t.campus ?? '';
    //         return (
    //             <div className="flex flex-col gap-1 w-44">
    //                 <div className="flex justify-between items-center font-label-sm text-label-sm">
    //                     <span className="text-on-surface font-semibold">{horas}h / {total}h</span>
    //                     {grupos && <span className="text-outline">Grupos: {grupos}</span>}
    //                 </div>
    //                 <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
    //                     <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, minWidth: pct > 0 ? '4px' : '0px' }}></div>
    //                 </div>
    //                 {campus && <span className="text-[11px] text-outline font-label-sm">{campus}</span>}
    //             </div>
    //         );
    //     },
    // }),
    // columnHelper.accessor(row => row.contrato, {
    //     id: 'contrato',
    //     header: 'Contrato/Escalafón',
    //     cell: ({ row }) => {
    //         const t = row.original;
    //         return (
    //             <div className="flex flex-col">
    //                 <span className="font-label-bold text-label-bold text-on-surface">{t.contrato ?? '—'}</span>
    //             </div>
    //         );
    //     },
    // }),
        columnHelper.accessor(row => row.estado, {
        id: 'estado',
        header: 'Estado',
        cell: ({ row }) => {
            const estado = row.original.estado;
            const isActive = estado === 'Activo' || estado === 'activo' || estado === '1';
            return (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ${isActive ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-tertiary' : 'bg-outline'}`}></span>
                    {isActive ? 'Activo en Aula' : (estado ?? '—')}
                </span>
            );
        },
    }),
];