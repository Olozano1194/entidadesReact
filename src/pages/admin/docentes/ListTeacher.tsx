import { useEffect, useState, useMemo } from "react";
//API
import { getTeacher } from '../../../api/teacher.api';
//Table
import { createColumnHelper } from '@tanstack/react-table';
import type { ColumnDef } from "@tanstack/react-table";
//Componente principal para la listas
import Table from '../../../components/Table';
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { Teacher } from '../../../types/teacher.model';
// Components
import SearchSection from "../../../components/table/SearchSection";
import MetricsSection from "../../../components/table/MetricsSection";
import HeaderSection from "../../../components/table/HeaderSection";
// icons
// import { MdOutlineDownload, MdOutlinePersonAddAlt, MdTrendingUp, MdSchedule, MdOutlineTimelapse, MdOutlineStarBorderPurple500 } from "react-icons/md";
import { TfiIdBadge } from "react-icons/tfi";
import { MdOutlineDownload, MdOutlinePersonAddAlt, MdTrendingUp, MdSchedule, MdOutlineTimelapse, MdOutlineStarBorderPurple500 } from "react-icons/md";



const ListTeacher = () => {
    const [ teacher, setTeacher ] = useState<Teacher[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ departamento, setDepartamento ] = useState('');    

    const departamentos = useMemo(
        () => Array.from(new Set(teacher.map((t) => t.departamento).filter(Boolean) as string[])).sort(),
        [teacher]
    );

    const filteredTeachers = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return teacher.filter((t) => {
            if (departamento && t.departamento !== departamento) return false;
            if (!term) return true;
            const haystack = `${t.nombre} ${t.apellido} ${t.identificacion ?? ''}`.toLowerCase();
            return haystack.includes(term);
        });
    }, [teacher, searchTerm, departamento]);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const teacherData = await getTeacher();
                setTeacher(teacherData);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    // Dashboard metrics (to be filled when the backend provides them)
    const [ metrics ] = useState<{
        tc?: number;
        hc?: number;
        cargaHorariaMedia?: number;
        evaluacionDesempeno?: number;
        acreditacionPct?: number;
        sedes?: number;
        docentesNuevos?: number;
    }>({});

    const teacherMetrics = [
        {
            id: 'docentes',
            title: 'Docentes Vinculados',
            value: teacher.length,
            icon: <TfiIdBadge className="text-[22px]" />,
            blurColor: 'bg-primary-fixed/30',
            indicator: metrics.docentesNuevos != null ? (
                <span className="font-label-sm font-semibold flex items-center text-tertiary text-label-sm">
                    <MdTrendingUp />
                    +{metrics.docentesNuevos} nuevos
                </span>
            ) : undefined,
            footer: (
                <div className="flex font-label-sm items-center justify-between text-outline text-label-sm">
                    <span>{metrics.acreditacionPct != null ? `${metrics.acreditacionPct}% con acreditación` : 'Acreditación pendiente'}</span>
                    <span className="font-medium text-on-surface">
                        {metrics.sedes != null ? `${metrics.sedes} sedes` : '— sedes'}
                    </span>
                </div>
            ),
        },
        {
            id: 'dedicacion',
            title: 'Dedicación Docente',
            value: (
                <>
                    {metrics.tc ?? '—'}
                    <span className="text-on-surface-variant font-light text-headline-md"> TC</span>
                </>
            ),
            icon: <MdSchedule className="text-[22px]" />,
            iconContainerClass: 'bg-tertiary-fixed/30 text-tertiary',
            blurColor: 'bg-tertiary-fixed/40',
            indicator: (
                <span className="text-outline font-label-bold text-label-bold">
                    / {metrics.hc ?? '—'} HC
                </span>
            ),
            footer: metrics.tc != null && metrics.hc != null ? (
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
                    <div className="bg-primary h-full" style={{ width: `${(metrics.tc / (metrics.tc + metrics.hc)) * 100}%` }}></div>
                    <div className="bg-secondary-fixed-dim h-full" style={{ width: `${(metrics.hc / (metrics.tc + metrics.hc)) * 100}%` }}></div>
                </div>
            ) : undefined,
        },
        {
            id: 'carga',
            title: 'Carga Horaria Media',
            value: metrics.cargaHorariaMedia ?? '—',
            icon: <MdOutlineTimelapse className="text-[22px]" />,
            iconContainerClass: 'bg-secondary-fixed/40 text-secondary',
            blurColor: 'bg-secondary-fixed/40',
            indicator: (
                <span className="font-label-sm font-semibold flex items-center text-outline text-label-sm">
                    hrs / sem
                </span>
            ),
            footer: (
                <div className="flex font-label-sm gap-1.5 items-center text-on-surface-variant text-label-sm">
                    <span className="bg-emerald-500 h-2 rounded-full shrink-0 w-2"></span>
                    <span>Balance óptimo de aula (Norma: 24h)</span>
                </div>
            ),
        },
        {
            id: 'evaluacion',
            title: 'Evaluación Desempeño',
            value: metrics.evaluacionDesempeno ?? '—',
            icon: <MdOutlineStarBorderPurple500 className="text-[22px]" />,
            iconContainerClass: 'bg-primary-fixed/30 text-primary',
            blurColor: 'bg-primary-fixed/30',
            indicator: (
                <span className="font-label-sm font-semibold flex items-center text-outline text-label-sm">
                    / 5.0
                </span>
            ),
            footer: (
                <div className="flex font-label-sm items-center justify-between text-outline text-label-sm">
                    <span>Evaluación por comités estudiantiles</span>
                    <span className="font-medium text-primary">96% rta</span>
                </div>
            ),
        },
    ];

    const columnHelper = createColumnHelper<Teacher>();

    const columns = [
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
                const email = t.email || t.correo;
                const photo = t.foto || t.avatar;
                const initials = `${t.nombre?.[0] ?? ''}${t.apellido?.[0] ?? ''}`.toUpperCase();
                return (
                    <section className="flex gap-3 items-center">
                        <div className="relative">
                            {photo ? (
                                <img
                                    src={photo}
                                    alt={`${t.nombre} ${t.apellido}`}
                                    className="h-10 w-10 rounded-full object-cover shadow-sm"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary shadow-sm">
                                    {initials}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 text-left">
                            <div className="font-label-bold flex gap-2 items-center text-label-bold text-on-surface">
                                <span>{t.nombre} {t.apellido}</span>
                            </div>
                            {email && (
                                <div className="font-label-sm text-label-sm text-outline truncate">
                                    {email}
                                </div>
                            )}
                            {t._id && (
                                <div className="font-label-sm text-[11px] text-outline-variant">
                                    UID: {t._id}
                                </div>
                            )}
                        </div>
                    </section>
                );
            },
        }),
        columnHelper.accessor(row => row.departamento, {
            id: 'departamento',
            header: 'Departamento/Cursos',
        }),
        columnHelper.accessor(row => row.telefono, {
            id: 'telefono',
            header: 'Telefono',
        }),
        columnHelper.accessor(row => row.cargaAcademica, {
            id: 'cargaAcademica',
            header: 'Carga Académica',
        }),
        columnHelper.accessor(row => row.contrato, {
            id: 'contrato',
            header: 'Contrato/Escalafón',
        }),        
        columnHelper.accessor(row => row.especialidad, {
            id: 'especialidad',
            header: 'Especialidad',
        }),
        columnHelper.accessor(row => row.estado, {
            id: 'estado',
            header: 'Estado',
        }),
    ] as ColumnDef<Teacher>[];

    return (
        <main className="flex-1 flex-col gap-y-4 max-w-[1440px] mx-auto p-8 rounded-xl space-y-section-gap w-full">
            <section className="flex flex-col w-full">
                <HeaderSection
                    breadcrumbs={[
                        'Gestión de Personal',
                        'Docentes', 
                        'Directorio General'
                    ]}
                    title="Planta Docente y Catedráticos"
                    badge="Periodo 2026-1"
                    description="Supervisión de talento pedagógico, escalafón ministerial, asignación lectiva y validación contractual para el cuerpo de profesores activo."
                    actions= {
                        <>
                        <button className="bg-surface-container-low cursor-pointer flex font-label-bold gap-2 items-center px-4 py-2.5 rounded-xl shadow-sm text-on-surface text-label-bold transition-all hover:bg-surface-container">
                            <MdOutlineDownload className="text-[20px]" />
                            Descarga Nómina/ Carga
                        </button>
                        <button className="bg-primary cursor-pointer flex font-label-bold gap-2 items-center px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 text-on-primary text-label-bold transition-all hover:scale-[1.01] active:scale-[0.99]">
                            <MdOutlinePersonAddAlt className="text-[20px]" />
                            Vincular Nuevo Docente
                        </button>
                        </>
                    } 
                />
                <MetricsSection metrics={teacherMetrics} columns={4} />
                {/* Filtration & Search */}
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Buscar por nombre o documento"
                    filters={[
                        {
                            key: 'departamento',
                            label: 'Departamento',
                            value: departamento,
                            onChange: setDepartamento,
                            options: departamentos.map((d) => ({ value: d, label: d })),
                        },
                    ]}
                    onClear={() => {
                        setSearchTerm('');
                        setDepartamento('');
                    }}
                />
            </section>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>
                ) : (
                    <div className="w-full">
                        <Table
                            data={filteredTeachers}
                            columns={columns}
                        />
                    </div>
                )
            }
        </main>
    );
}
export default ListTeacher;