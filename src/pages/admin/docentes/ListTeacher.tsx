import { useEffect, useState } from "react";
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
// Icons
import { MdOutlineChevronRight, MdOutlineDownload, MdOutlinePersonAddAlt } from "react-icons/md";
// Components
import SearchTeacher from "./components/SearchTeacher";
import TeacherMetrics from "./components/TeacherMetrics";


const ListTeacher = () => {
    const [ teacher, setTeacher ] = useState<Teacher[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    // Dashboard metrics (to be filled when the backend provides them)
    const [ metrics ] = useState<{
        tc?: number;
        hc?: number;
        cargaHorariaMedia?: number;
        evaluacionDesempeno?: number;
        acreditacionPct?: number;
        sedes?: number;
    }>({});

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

    const columnHelper = createColumnHelper<Teacher>();

    const columns = [
        columnHelper.accessor((_, index) => index + 1, {
            id: 'index',
            header: 'N°',
            cell: (info) => info.row.index + 1,
        }),
        columnHelper.accessor(row => `${row.nombre} ${row.apellido}`, {
            id: 'nombre',
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
        columnHelper.accessor(row => row.telefono, {
            id: 'telefono',
            header: 'Telefono',
        }),
        columnHelper.accessor(row => row.especialidad, {
            id: 'especialidad',
            header: 'Especialidad',
        })
    ] as ColumnDef<Teacher>[];

    return (
        <main className="flex-1 flex-col gap-y-4 max-w-[1440px] mx-auto p-8 rounded-xl space-y-section-gap w-full">
            <section className="flex flex-col w-full">
                <section className="flex flex-col gap-6 justify-between pb-6 lg:flex-row lg:items-end">
                    <div className="space-y-2">
                        <div className="flex font-label-sm gap-2 items-center text-label-sm text-outline">
                            <span className="cursor-pointer transition-colors hover:text-primary">
                                Gestión de personal
                            </span>
                            <MdOutlineChevronRight className="text-outline-variant text-[14px]" />
                            <span className="cursor-pointer transition-colors hover:text-primary">
                                Docentes
                            </span>
                            <MdOutlineChevronRight className="text-outline-variant text-[14px]" />
                            <span className="font-semibold text-primary">
                                Directorio General
                            </span>
                        </div>
                        <div className="flex gap-3 items-baseline">
                            <h2 className="font-headline-lg font-semibold text-headline-lg text-on-surface tracking-tight">
                                Planta Docente y Catedráticos
                            </h2>
                            <span className="bg-secondary-container font-label-sm font-medium inline-flex items-center px-2 py-0.5 rounded-full text-label-sm text-on-secondary-container">
                                Periodo 2026-2
                            </span>
                        </div>
                        <p className="font-body-md max-w-2xl text-body-md text-on-surface-variant">
                            Supervisión de talento pedagógico, escalafón ministerial, asignación lectiva y validación contractual para el cuerpo de profesores activo.
                        </p>
                    </div>
                    <div className="flex gap-3 items-center self-start lg:self-auto">
                        <button className="bg-surface-container-low cursor-pointer flex font-label-bold gap-2 items-center px-4 py-2.5 rounded-xl shadow-sm text-on-surface text-label-bold transition-all hover:bg-surface-container">
                            <MdOutlineDownload className="text-[20px]" />
                            Descarga Nómina/ Carga
                        </button>
                        <button className="bg-primary cursor-pointer flex font-label-bold gap-2 items-center px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 text-on-primary text-label-bold transition-all hover:scale-[1.01] active:scale-[0.99]">
                            <MdOutlinePersonAddAlt className="text-[20px]" />
                            Vincular Nuevo Docente
                        </button>
                    </div>
                </section>
                <TeacherMetrics teacherCount={teacher.length} metrics={metrics} />
                {/* Filtration & Search */}
                <SearchTeacher />
            </section>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>
                ) : (
                    <div className="w-full">
                        <Table
                            data={teacher}
                            columns={columns}
                        />
                    </div>
                )
            }
        </main>
    );
}
export default ListTeacher;