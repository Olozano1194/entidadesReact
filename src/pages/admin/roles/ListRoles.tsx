import { useEffect, useState, useMemo } from "react";
//API
import { getRoles } from "../../../api/roles.api";
import { getUsers } from "../../../api/user.api";
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { Rol } from "../../../types/rol.models";
import type { ListUserDto } from "../../../types/dto/user.dto";
// Components
import Table from '../../../components/Table';
import type { ColumnDef } from '@tanstack/react-table';
import HeaderSection from "../../../components/table/HeaderSection";
import SearchSection from "../../../components/table/SearchSection";
import RoleMetrics from "./components/RoleMetrics";
import { getRoleColumns } from "./components/columns";

const ListRoles = () => {
    const [ roles, setRoles ] = useState<Rol[]>([]);
    const [ users, setUsers ] = useState<ListUserDto[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const [rolesData, usersData] = await Promise.all([
                    getRoles(),
                    getUsers(),
                ]);
                setRoles(rolesData);
                setUsers(usersData);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const filteredRoles = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return roles;
        return roles.filter((r) => {
            const haystack = `${r.nombre} ${r.descripcion ?? ''} ${(r.permisos ?? []).join(' ')}`.toLowerCase();
            return haystack.includes(term);
        });
    }, [roles, searchTerm]);

    const totalRoles = roles.length;
    const rolesActivos = roles.filter((r) => r.activo).length;
    const totalPermisos = roles.reduce((acc, r) => acc + (r.permisos?.length || 0), 0);
    const usuariosConRol = users.filter((u) => u.rol).length;

    const columns = getRoleColumns() as unknown as ColumnDef<Rol>[];

    return (
        <main className="flex-1 flex-col gap-y-4 max-w-[1440px] mx-auto p-8 rounded-xl space-y-section-gap w-full">
            <section className="flex flex-col w-full">
                <HeaderSection
                    breadcrumbs={['Configuración del Sistema', 'Seguridad', 'Roles y Permisos']}
                    title="Matriz de Roles y Niveles de Acceso"
                    description="Configura los privilegios granulares y controla el acceso basado en roles (RBAC) para los módulos académicos, directivos, administrativos y de auditoría institucional."
                    actions={
                        <>
                            <button className="px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-secondary font-label-bold text-label-bold transition-all flex items-center gap-2 shadow-sm">
                                Registro de Auditoría
                            </button>
                            <button className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                                Crear Nuevo Rol Personalizado
                            </button>
                        </>
                    }
                />
                <RoleMetrics totalRoles={totalRoles} rolesActivos={rolesActivos} totalPermisos={totalPermisos} usuariosConRol={usuariosConRol} />
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Buscar por nombre o descripción..."
                    filters={[]}
                    onClear={() => setSearchTerm('')}
                />
            </section>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>
                ) : (
                    <div className="w-full">
                        <Table
                            data={filteredRoles}
                            columns={columns}
                        />
                    </div>
                )
            }
        </main>
    );
}
export default ListRoles;