import { useEffect, useState, useMemo } from "react";
//API
import { getInstitutions } from "../../../api/institution.api";
//Mensajes
import { toast } from 'react-hot-toast';
//Dtos
import type { ListInstitucionDto } from "../../../types/dto/institution.dto";
// Components
import HeaderSection from "../../../components/table/HeaderSection";
import InstitutionMetrics from "./components/InstitutionMetrics";
import SearchSection from "../../../components/table/SearchSection";
import Table from "../../../components/Table";
import type { ColumnDef } from "@tanstack/react-table";
import { getInstitutionColumns } from "./components/columns";

const ListInstitutions = () => {
    const [ institution, setInstitution ] = useState<ListInstitucionDto[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ departamento, setDepartamento ] = useState('');
    const [ estado, setEstado ] = useState('');
    const [ modalidad, setModalidad ] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const institutionData = await getInstitutions();
                setInstitution(institutionData);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const departamentos = useMemo(
        () => Array.from(new Set(institution.map((i) => {
            if (typeof i.iddepartamento === 'object' && i.iddepartamento !== null) return i.iddepartamento.descripcion;
            return i.iddepartamento;
        }).filter(Boolean) as string[])).sort(),
        [institution]
    );

    const filteredInstitutions = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return institution.filter((i) => {
            const dept = typeof i.iddepartamento === 'object' && i.iddepartamento !== null ? i.iddepartamento.descripcion : i.iddepartamento;
            if (departamento && dept !== departamento) return false;
            if (!term) return true;
            const haystack = `${i.nombre} ${i.director} ${i.email} ${i.telefono} ${i.direccion}`.toLowerCase();
            return haystack.includes(term);
        });
    }, [institution, searchTerm, departamento]);

    const totalSedes = useMemo(() => institution.reduce((acc, i) => acc + (Number(i.nosedes) || 0), 0), [institution]);
    const totalEstudiantes = useMemo(() => institution.reduce((acc, i) => acc + (i.estudiantes?.length || 0), 0), [institution]);

    const columns = getInstitutionColumns() as unknown as ColumnDef<ListInstitucionDto>[];

    return (
        <main className="flex-1 p-8 max-w-[1440px] mx-auto w-full space-y-section-gap">
            <div className="flex flex-col w-full">
                <HeaderSection
                    breadcrumbs={['Red Multi-Tenant Nacional']}
                    title="Directorio de Instituciones Educativas"
                    description="Supervisión unificada de sedes regionales, convenios de licenciamiento activo y capacidad de matrículas en tiempo real."
                    badge={undefined}
                    actions={
                        <>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-bold text-label-bold transition-all shadow-sm">
                                Exportar Listado
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-bold text-label-bold transition-all shadow-md hover:shadow-lg">
                                Registrar Nueva Institución
                            </button>
                        </>
                    }
                />
                <InstitutionMetrics totalInstitutions={institution.length} totalSedes={totalSedes} totalEstudiantes={totalEstudiantes} />
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Buscar por nombre, código DANE, NIT o rector..."
                    filters={[
                        {
                            key: 'departamento',
                            label: 'Todos los Departamentos',
                            value: departamento,
                            onChange: setDepartamento,
                            options: departamentos.map((d) => ({ value: d, label: d })),
                        },
                        {
                            key: 'estado',
                            label: 'Estado: Todos',
                            value: estado,
                            onChange: setEstado,
                            options: [
                                { value: 'activa', label: 'Activa' },
                                { value: 'auditoria', label: 'En Auditoría' },
                                { value: 'revision', label: 'Por Renovar' },
                                { value: 'suspendida', label: 'Suspendida' },
                            ],
                        },
                        {
                            key: 'modalidad',
                            label: 'Modalidad: Todas',
                            value: modalidad,
                            onChange: setModalidad,                            
                            options: [
                                { value: 'academico', label: 'Académico' },
                                { value: 'bilingue', label: 'Bilingüe Internacional' },
                                { value: 'tecnico', label: 'Media Técnica SENA' },
                            ],
                        },
                    ]}
                    onClear={() => {
                        setSearchTerm('');
                        setDepartamento('');
                        setEstado('');
                        setModalidad('');
                    }}
                />
            </div>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>
                ) : (
                    <div className="w-full">
                        <Table
                            data={filteredInstitutions}
                            columns={columns}
                        />
                    </div>
                )
            }
        </main>
    );
}
export default ListInstitutions;