import { createColumnHelper } from '@tanstack/react-table';
import type { Teacher } from '../../../../types/teacher.model';

const columnHelper = createColumnHelper<Teacher>();

export const getTeacherColumns = () => [
    columnHelper.accessor((_, index) => index + 1, {
        id: 'index',
        header: 'N°',
        cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor(row => `${row.nombre} ${row.apellido}`, {
        id: 'docente',
        header: 'Docente y Credenciales',
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
                            <span className="text-outline">{t.especialidad ?? '—'}</span>
                        </div>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor(row => row.departamento, {
        id: 'departamento',
        header: 'Departamento/Cursos',
        cell: ({ row }) => {
            const t = row.original;
            const materias = t.materias ?? [];
            return (
                <div className="flex flex-col items-start gap-1.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-medium">
                        {t.departamento ?? '—'}
                    </span>
                    {materias.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {materias.map((m, i) => (
                                <span key={i} className="bg-surface-container px-2 py-0.5 rounded text-[11px] font-label-bold text-on-surface-variant">{m}</span>
                            ))}
                        </div>
                    )}
                </div>
            );
        },
    }),
    columnHelper.accessor(row => row.telefono, {
        id: 'telefono',
        header: 'Telefono',
    }),
    columnHelper.accessor(row => row.cargaAcademica, {
        id: 'cargaAcademica',
        header: 'Carga Académica',
        cell: ({ row }) => {
            const t = row.original;
            const horas = t.horasAsignadas ?? 0;
            const total = t.horasTotales ?? 0;
            const pct = total > 0 ? (horas / total) * 100 : 0;
            const grupos = t.grupos ?? '';
            const campus = t.campus ?? '';
            return (
                <div className="flex flex-col gap-1 w-44">
                    <div className="flex justify-between items-center font-label-sm text-label-sm">
                        <span className="text-on-surface font-semibold">{horas}h / {total}h</span>
                        {grupos && <span className="text-outline">Grupos: {grupos}</span>}
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, minWidth: pct > 0 ? '4px' : '0px' }}></div>
                    </div>
                    {campus && <span className="text-[11px] text-outline font-label-sm">{campus}</span>}
                </div>
            );
        },
    }),
    columnHelper.accessor(row => row.contrato, {
        id: 'contrato',
        header: 'Contrato/Escalafón',
        cell: ({ row }) => {
            const t = row.original;
            return (
                <div className="flex flex-col">
                    <span className="font-label-bold text-label-bold text-on-surface">{t.contrato ?? '—'}</span>
                </div>
            );
        },
    }),
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