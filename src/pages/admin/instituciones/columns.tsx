import { Link } from "react-router-dom";
import { createColumnHelper } from '@tanstack/react-table';
import { MdApartment, MdVisibility, MdMoreVert, MdLocationOn } from "react-icons/md";
import type { ListInstitucionDto } from "../../../types/dto/institution.dto";

const columnHelper = createColumnHelper<ListInstitucionDto>();

const getDept = (inst: ListInstitucionDto) =>
    typeof inst.iddepartamento === 'object' && inst.iddepartamento !== null
        ? inst.iddepartamento.descripcion
        : inst.iddepartamento;

const getInitials = (name: string) =>
    name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export const getInstitutionColumns = () => [
    columnHelper.accessor((_, index) => index + 1, {
        id: 'index',
        header: 'N°',
        cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor((row) => row.nombre, {
        id: 'institucion',
        header: 'Institución & Identificador',
        cell: ({ row }) => {
            const inst = row.original;
            const dept = getDept(inst);
            return (
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary font-display-xl text-lg font-bold">
                        {getInitials(inst.nombre)}
                    </div>
                    <div>
                        <div className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                            {inst.nombre}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
                            <span className="font-mono text-outline">DANE: {inst._id}</span>
                            {dept && (
                                <>
                                    <span>•</span>
                                    <span className="flex items-center gap-0.5">
                                        <MdLocationOn className="text-xs" />
                                        {dept}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor((row) => row.director, {
        id: 'rector',
        header: 'Rector / Dirección',
        cell: ({ row }) => {
            const inst = row.original;
            return (
                <div>
                    <div className="font-label-bold text-label-bold text-on-surface">{inst.director}</div>
                    <a className="font-label-sm text-label-sm text-outline hover:text-primary block transition-colors" href={`mailto:${inst.email}`}>
                        {inst.email}
                    </a>
                    <span className="font-label-sm text-label-sm text-outline">{inst.telefono}</span>
                </div>
            );
        },
    }),
    columnHelper.accessor((row) => row.nosedes, {
        id: 'sedes',
        header: 'Sedes & Alumnado',
        cell: ({ row }) => {
            const inst = row.original;
            const sedes = Number(inst.nosedes) || 0;
            const estudiantes = inst.estudiantes?.length || 0;
            return (
                <div className="flex flex-col gap-1.5 min-w-[140px]">
                    <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                            {sedes} Sedes
                        </span>
                        <span className="text-on-surface-variant font-mono">{estudiantes.toLocaleString('es-CO')} est.</span>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(100, (estudiantes / 5000) * 100)}%` }}></div>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor(() => 'Académico', {
        id: 'modalidad',
        header: 'Modalidad',
        cell: ({ row }) => {
            const inst = row.original;
            return (
                <div className="flex flex-col">
                    <span className="font-label-bold text-label-bold text-on-surface">Modalidad</span>
                    <span className="font-label-sm text-label-sm text-outline">{inst.direccion}</span>
                </div>
            );
        },
    }),
    columnHelper.accessor(() => 'Activo', {
        id: 'convenio',
        header: 'Convenio SaaS',
        cell: () => (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                Activo
            </span>
        ),
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const id = row.original._id;
            return (
                <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-outline hover:text-primary hover:bg-surface-container rounded-lg transition-colors" title="Gestionar Sedes">
                        <MdApartment className="text-lg" />
                    </button>
                    <Link to={`/admin/instituciones/${id}`} className="p-2 text-outline hover:text-primary hover:bg-surface-container rounded-lg transition-colors" title="Detalles de la Institución">
                        <MdVisibility className="text-lg" />
                    </Link>
                    <button className="p-2 text-outline hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors" title="Opciones">
                        <MdMoreVert className="text-lg" />
                    </button>
                </div>
            );
        },
    }),
];