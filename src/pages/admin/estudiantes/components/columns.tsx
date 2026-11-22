import { createColumnHelper } from '@tanstack/react-table';
import type { Student } from '../../../../types/student.model';

const columnHelper = createColumnHelper<Student>();

const formatDate = (date: Date): string => {
    if (!date) return 'No registrada';
    try {
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date.toLocaleString('es-CO');
        }
        if (typeof date === 'string') {
            const parseDate = new Date(date as string);
            if (!isNaN(parseDate.getTime())) {
                return parseDate.toLocaleString('es-CO', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
            }
        }
        return 'Formato Inválido';
    } catch {
        return 'Formato de fecha no válido';
    }
};

export const getStudentColumns = () => [
    columnHelper.accessor((_, index) => index + 1, {
        id: 'index',
        header: 'N°',
        cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor(row => `${row.nombre} ${row.apellido}`, {
        id: 'estudiante',
        header: 'Estudiante & Curso',
        cell: ({ row }) => {
            const s = row.original;
            return (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary font-display-xl text-lg font-bold">
                        {`${s.nombre?.[0] ?? ''}${s.apellido?.[0] ?? ''}`.toUpperCase()}
                    </div>
                    <div>
                        <div className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                            {s.nombre} {s.apellido}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
                            {s.curso && <span className="text-outline">{s.curso}</span>}
                        </div>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor(row => row.fechanacimiento, {
        id: 'fechanacimiento',
        header: 'Fecha de nacimiento',
        cell: (info) => formatDate(info.getValue() as Date),
    }),
    columnHelper.accessor(row => row.identificacion, {
        id: 'identificacion',
        header: 'Identificación',
    }),
    columnHelper.accessor(row => row.telefono, {
        id: 'telefono',
        header: 'Telefono',
    }),
    columnHelper.accessor(row => row.acudiente, {
        id: 'acudiente',
        header: 'Acudiente / Tutor',
    }),
    columnHelper.accessor(row => row.direccion, {
        id: 'direccion',
        header: 'Dirección',
    }),
    columnHelper.accessor(row => row.desempeño, {
        id: 'desempeno',
        header: 'Desempeño / Asistencia',
    }),
    columnHelper.accessor(row => row.estadoMatricula, {
        id: 'estadoMatricula',
        header: 'Estado Matrícula',
        cell: ({ row }) => {
            const estado = row.original.estadoMatricula;
            const isActive = estado === 'Activo' || estado === 'activo';
            return (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ${isActive ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-tertiary' : 'bg-outline'}`}></span>
                    {isActive ? 'Activo' : 'Inactivo'}
                </span>
            );
        },
    }),
];