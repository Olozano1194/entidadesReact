import { useEffect, useState, useMemo } from "react";
//API
import { getStudent } from '../../../api/student.api';
//Table
import Table from '../../../components/Table';
import type { ColumnDef } from '@tanstack/react-table';
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { Student } from '../../../types/student.model';
// Components
import HeaderSection from "../../../components/table/HeaderSection";
import SearchSection from "../../../components/table/SearchSection";
import StudentMetrics from "./components/StudentMetrics";
import { getStudentColumns } from "./components/columns";
// icons
import { MdOutlineDownload, MdOutlinePersonAddAlt } from "react-icons/md";

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

    const columns = getStudentColumns() as unknown as ColumnDef<Student>[];

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
                <StudentMetrics metrics={{}} />
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
                            onChange: setEstado,
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
                    <div className="w-full">
                        <Table
                            data={filteredStudent}
                            columns={columns}
                        />
                    </div>
                )
            }
        </main>
    );
}
export default ListStudent;