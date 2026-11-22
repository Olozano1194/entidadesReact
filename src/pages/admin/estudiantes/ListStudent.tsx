import { useEffect, useState, useMemo } from "react";
//API
import { getStudent } from '../../../api/student.api';
//Table
import { createColumnHelper } from '@tanstack/react-table';
import type { ColumnDef } from "@tanstack/react-table";
//Componente principal para la listas
import Table from '../../../components/Table';
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { Student } from '../../../types/student.model';
// components
import HeaderSection from "../../../components/table/HeaderSection";
import MetricsSection from "../../../components/table/MetricsSection";
import SearchSection from "../../../components/table/SearchSection";
// icons
import { MdOutlineDownload, MdOutlinePersonAddAlt, MdOutlineHowToReg, MdInsights, MdCheckCircleOutline, MdOutlineVerified } from "react-icons/md";
import { IoIosSchool, IoMdArrowUp } from "react-icons/io";


const ListStudent = () => {
    const [student, setStudent] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [nivel, setNivel] = useState('');
    const [estado, setEstado] = useState('');
    const [salon, setSalon] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const studentData = await getStudent();
                // console.log('User data received:', studentData);
                setStudent(studentData);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const formatDate = (date: Date): string => {
        if (!date) return 'No registrada';

        try {
            if (date instanceof Date && !isNaN(date.getTime())) {
                return date.toLocaleString('es-CO');
            }
            if (typeof date === 'string') {
                const dateString = date;
                const parseDate = new Date(dateString);

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

    const niveles = useMemo(
        () => Array.from(new Set(student.map((t) => t.nivel).filter(Boolean) as string[])).sort(),
        [student]
    );
    const salones = useMemo(
        () => Array.from(new Set(student.map((t) => t.salones).filter(Boolean) as string[])).sort(),
        [student]
    );
    const estados = useMemo(
        () => Array.from(new Set(student.map((t) => t.estadoMatricula).filter(Boolean) as string[])).sort(),
        [student]
    );

    const filteredStudent = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return student.filter((t) => {
            if (nivel && t.nivel !== nivel) return false;
            if (salon && t.salones !== salon) return false;
            if (estado && t.estadoMatricula !== estado) return false;
            if (!term) return true;
            const haystack = `${t.nombre} ${t.apellido} ${t.identificacion ?? ''}`.toLowerCase();
            return haystack.includes(term);
        });
    }, [student, searchTerm, estado, nivel, salon]);

    // Dashboard metrics (to be filled when the backend provides them)
    const [ metrics ] = useState<{
        matriculaActiva?: number;
        matriculaVariacion?: number;
        capacidadProyectadaPct?: number;
        nuevosIngresos?: number;
        nuevosIngresosVariacion?: number;
        nuevosIngresosTendencia?: 'up' | 'down';
        promedioGeneral?: number;
        promedioNivel?: string;
        retencionPct?: number;
        metaRetencion?: number;
        desercionProyectada?: number;
        asistenciaDiaria?: number;
        moraBaja?: boolean;
    }>({});

    const studentMetrics = [
        {
            id: 'matricula',
            title: 'Matrícula Activa',
            value: metrics.matriculaActiva != null ? metrics.matriculaActiva.toLocaleString('es-CO') : '—',
            icon: <IoIosSchool className="text-2xl" />,
            blurColor: 'bg-primary-fixed/30',
            indicator: metrics.matriculaVariacion != null ? (
                <span className="text-primary font-label-bold text-label-sm flex items-center">
                    <IoMdArrowUp className="text-[16px]" /> {metrics.matriculaVariacion >= 0 ? '+' : ''}{metrics.matriculaVariacion}%
                </span>
            ) : undefined,
            footer: (
                <>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {metrics.capacidadProyectadaPct != null ? `${metrics.capacidadProyectadaPct}% capacidad total proyectada` : 'capacidad total proyectada'}
                    </p>
                    <div className="mt-4 pt-3">
                        <svg className="w-full h-8 text-primary overflow-visible" fill="none" viewBox="0 0 100 24">
                            <path d="M0 20 Q 25 15, 50 18 T 100 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                            <path d="M0 20 Q 25 15, 50 18 T 100 4 L 100 24 L 0 24 Z" fill="currentColor" fillOpacity="0.08"></path>
                        </svg>
                    </div>
                </>
            ),
        },
        {
            id: 'ingresos',
            title: 'Nuevos Ingresos 2025',
            value: metrics.nuevosIngresos != null ? metrics.nuevosIngresos.toLocaleString('es-CO') : '—',
            icon: <MdOutlineHowToReg className='text-2xl' />,
            blurColor: 'bg-secondary-fixed/40',
            indicator: metrics.nuevosIngresosVariacion != null ? (
                <span className="text-secondary font-label-bold text-label-sm flex items-center">
                    <IoMdArrowUp className="text-[16px]" /> {metrics.nuevosIngresosTendencia === 'down' ? '-' : '+'}{Math.abs(metrics.nuevosIngresosVariacion)}%
                </span>
            ) : undefined,
            footer: (
                <>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Primaria y Bachillerato regular</p>
                    <div className="mt-4 pt-3 flex gap-1">
                        <div className="h-2 rounded-full bg-secondary flex-[7]" title="Admitidos (70%)"></div>
                        <div className="h-2 rounded-full bg-secondary-fixed flex-[2]" title="En validación (20%)"></div>
                        <div className="h-2 rounded-full bg-surface-container flex-[1]" title="Pendientes (10%)"></div>
                    </div>
                </>
            ),
        },
        {
            id: 'promedio',
            title: 'Promedio General',
            value: (
                <>
                    {metrics.promedioGeneral != null ? metrics.promedioGeneral.toFixed(1) : '—'}
                    <span className="font-headline-md text-headline-md text-outline">/ 5.0</span>
                    {metrics.promedioNivel && (
                        <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-bold text-[10px] ml-auto">
                            {metrics.promedioNivel}
                        </span>
                    )}
                </>
            ),
            icon: <MdInsights className="text-2xl" />,
            blurColor: 'bg-tertiary-fixed/40',
            footer: (
                <>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Corte Evaluativo Semestral I</p>
                    <div className="mt-4 pt-3">
                        <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                    </div>
                </>
            ),
        },
        {
            id: 'retencion',
            title: 'Retención & Asistencia',
            value: metrics.retencionPct != null ? `${metrics.retencionPct}%` : '—',
            icon: <MdCheckCircleOutline className="text-2xl" />,
            blurColor: 'bg-surface-container-high',
            indicator: metrics.metaRetencion != null ? (
                <span className="text-primary font-label-bold text-label-sm flex items-center">
                    <MdOutlineVerified className="text-[16px]" /> Meta &gt;{metrics.metaRetencion}%
                </span>
            ) : undefined,
            footer: (
                <div className="mt-4 pt-3 flex items-center justify-between text-label-sm font-label-sm text-outline">
                    {metrics.desercionProyectada != null && <span>Deserción proyectada: {metrics.desercionProyectada}%</span>}
                    {metrics.asistenciaDiaria != null && (
                        <>
                            <span>Asistencia diaria: {metrics.asistenciaDiaria}%</span>
                            {metrics.moraBaja && <span>Mora baja</span>}
                        </>
                    )}
                </div>
            ),
        },
    ];

    const columnHelper = createColumnHelper<Student>();

    const columns = [
        columnHelper.accessor((_, index) => index + 1, {
            id: 'index',
            header: 'N°',
            cell: (info) => {
                // Solo mostrar el número si no es la fila de total
                return info.row.index + 1;
            },
        }),
        columnHelper.accessor(row => `${row.nombre} ${row.apellido}`, {
            id: 'estudiante',
            header: 'Estudiante & Curso',
        }),
        columnHelper.accessor(row => row.fechanacimiento, {
            id: 'fechanacimiento',
            header: 'Fecha de nacimiento',
            cell: info => formatDate(info.getValue())
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
            id: 'desempeño',
            header: 'Desempeño / Asistencia',
        }),
        columnHelper.accessor(row => row.estadoMatricula, {
            id: 'estadoMatricula',
            header: 'Estado Matricula',
        }),
        // columnHelper.accessor('actions', {
        //     header: 'Acciones',
        //     cell: (({ row }) => (
        //         <div className="flex justify-center items-center gap-x-4">
        //             <Link to={`/edit/usuarios/${row.original.id}`} className="bg-green-500 text-white p-2 rounded-md">Editar</Link>
        //             <button className="bg-red-500 text-white p-2 rounded-md">Eliminar</button>
        //         </div>
        //     )),
        // }),
    ] as ColumnDef<Student>[];

    return (
        <main className="flex-1 flex-col gap-y-4 max-w-[1440px] mx-auto p-8 rounded-xl space-y-section-gap w-full">
            <section className="flex flex-col w-full">
                <HeaderSection
                    breadcrumbs={[
                        'Secretaría Académica',
                        'Estudiantes',
                        'Directorio Oficial'
                    ]}
                    title="Directorio General de Estudiantes"
                    badge="Ciclo Lectivo 2026"
                    description="Consolidado de expedientes académicos. registro biométrico, tutela parental y estado financiero general del alumnado activo."
                    actions={
                        <>
                            <button className="bg-surface-container-low cursor-pointer flex font-label-bold gap-2 items-center px-4 py-2.5 rounded-xl shadow-sm text-on-surface text-label-bold transition-all hover:bg-surface-container">
                                <MdOutlineDownload className="text-[20px]" />
                                Exportar Carnets / Listados
                            </button>
                            <button className="bg-primary cursor-pointer flex font-label-bold gap-2 items-center px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 text-on-primary text-label-bold transition-all hover:scale-[1.01] active:scale-[0.99]">
                                <MdOutlinePersonAddAlt className="text-[20px]" />
                                Matricula Nuevo Estudiante
                            </button>
                        </>
                    }
                />
                <MetricsSection metrics={studentMetrics} columns={4} />
                {/* Filtration & Search */}
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Buscar por nombre o documento"
                    filters={[
                        {
                            key: 'nivel',
                            label: 'Nivel',
                            value: nivel,
                            onChange: setNivel,
                            options: niveles.map((d) => ({ value: d, label: d })),
                        },
                        {
                            key: 'salon',
                            label: 'Salón',
                            value: salon,
                            onChange: setSalon,
                            options: salones.map((d) => ({ value: d, label: d })),
                        },
                        {
                            key: 'estado',
                            label: 'Estado',
                            value: estado,
                            onChange: setSalon,
                            options: estados.map((d) => ({ value: d, label: d })),
                        },
                    ]}
                    onClear={() => {
                        setSearchTerm('');
                        setNivel('');
                        setSalon('');
                        setEstado('');
                    }}
                />
            </section>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>

                ) : (
                    <Table
                        data={filteredStudent}
                        columns={columns}
                    />
                )
            }
        </main>
    );
}
export default ListStudent;