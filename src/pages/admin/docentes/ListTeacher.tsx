import { useEffect, useState, useMemo } from "react";
//API
import { getTeacher } from '../../../api/teacher.api';
//Table
import Table from '../../../components/Table';
import type { ColumnDef } from '@tanstack/react-table';
// ...
import { getTeacherColumns } from "./components/columns";
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { Teacher } from '../../../types/teacher.model';
// Components
import HeaderSection from "../../../components/table/HeaderSection";
import SearchSection from "../../../components/table/SearchSection";
import TeacherMetrics from "./components/TeacherMetrics";
// icons
// import { MdOutlineDownload, MdOutlinePersonAddAlt, MdTrendingUp, MdSchedule, MdOutlineTimelapse, MdOutlineStarBorderPurple500 } from "react-icons/md";
import { MdOutlineDownload, MdOutlinePersonAddAlt } from "react-icons/md";



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

    const columns = getTeacherColumns() as unknown as ColumnDef<Teacher>[];

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
                <TeacherMetrics teacherCount={teacher.length} metrics={metrics} />
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