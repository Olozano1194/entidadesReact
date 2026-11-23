import { useEffect, useState, useMemo } from "react";
//API
import { getUsers } from '../../../api/user.api';
import { getRoles } from "../../../api/roles.api";
//Table
// import { createColumnHelper } from '@tanstack/react-table';
import type { ColumnDef } from "@tanstack/react-table";
//Componente principal para la listas
import Table from '../../../components/Table';
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { Rol } from "../../../types/rol.models";
// Dto
import type { ListUserDto } from "../../../types/dto/user.dto";
// icons
import { MdMail, MdOutlinePersonAddAlt } from "react-icons/md";
// Componets
import HeaderSection from "../../../components/table/HeaderSection";
import SearchSection from "../../../components/table/SearchSection";
import { getUserColumns } from "./components/columns";
import UserMetrics from "./components/UserMetrics";


const ListUser = () => {
    const [users, setUser] = useState<ListUserDto[]>([]);
    const [, setRoles] = useState<Rol[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');    
    const [estado, setEstado] = useState('');    
    const [rol, setRol] = useState('');
    const [sede, setSede] = useState('');    

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const [userData, rolesData] = await Promise.all([
                    getUsers(),
                    getRoles(),
                ]);
                setRoles(rolesData);
                setUser(userData);

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const sedes = useMemo(
        () => Array.from(new Set(users.map((u) => u.institucion).filter(Boolean) as string[])).sort(),
        [users]
    );
    const roles = useMemo(
        () => Array.from(new Set(users.map((t) => {
            const r = t.rol;
            return (typeof r === 'object' && r !== null ? (r as { nombre?: string }).nombre : r) as string;
        }).filter(Boolean))).sort(),
        [users]
    );
    // const sedes = useMemo(
    //     () => Array.from(new Set(student.map((t) => t.salones).filter(Boolean) as string[])).sort(),
    //     [student]
    // );
    const estados = useMemo(
        () => Array.from(new Set(users.map((t) => t.estado).filter(Boolean) as string[])).sort(),
        [users]
    );

    const filteredRol = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return users.filter((t) => {
            const tRol = typeof t.rol === 'object' && t.rol !== null ? (t.rol as { nombre?: string }).nombre ?? '' : String(t.rol ?? '');
            if (estado && t.estado !== estado) return false;
            if (rol && tRol !== rol) return false;
            if (sede && t.institucion !== sede) return false;
            if (!term) return true;
            const haystack = `${t.nombre} ${t.apellido} ${t.email ?? ''} ${tRol}`.toLowerCase();
            return haystack.includes(term);
        });
    }, [users, searchTerm, estado, rol, sede]);

    // const columnHelper = createColumnHelper<ListUserDto>();

    const columns = getUserColumns() as unknown as ColumnDef<ListUserDto>[];

    // const columns = [
    //     columnHelper.accessor((_, index) => index + 1, {
    //         id: 'index',
    //         header: 'N°',
    //         cell: (info) => {
    //             // Solo mostrar el número si no es la fila de total
    //             return info.row.index + 1;
    //         },
    //     }),
    //     columnHelper.accessor(row => `${row.nombre} ${row.apellido}`, {
    //         id: 'nombre',
    //         header: 'Nombre Completo',
    //     }),
    //     columnHelper.accessor(row => row.email, {
    //         id: 'email',
    //         header: 'Correo',
    //     }),
    //     columnHelper.accessor(row => row.rol, {
    //         id: 'roles',
    //         header: 'Rol',
    //     }),
    //     // columnHelper.accessor('actions', {
    //     //     header: 'Acciones',
    //     //     cell: (({ row }) => (
    //     //         <div className="flex justify-center items-center gap-x-4">
    //     //             <Link to={`/edit/usuarios/${row.original.id}`} className="bg-green-500 text-white p-2 rounded-md">Editar</Link>
    //     //             <button className="bg-red-500 text-white p-2 rounded-md">Eliminar</button>
    //     //         </div>
    //     //     )),
    //     // }),
    // ] as ColumnDef<ListUserDto>[];

    return (
        <main className="flex-1 flex-col gap-y-4 max-w-[1440px] mx-auto p-8 rounded-xl space-y-section-gap w-full">
            <section className="flex flex-col w-full">
                <HeaderSection
                    breadcrumbs={[
                        'Configuración del Sistema',
                        'Accesos',
                        'Usuarios del Sistema'
                    ]}
                    title="Usuarios y Credenciales de Plataforma"
                    badge="v1.2.1 Activa"
                    description="Administración centralizada de identidades federadas, directivas criptográficas 2FA, monitoreo de sesiones simultáneas y aprovisionamiento de permisos por sede académica."
                    actions={
                        <>
                            <button className="bg-surface-container-low cursor-pointer flex font-label-bold gap-2 items-center px-4 py-2.5 rounded-xl shadow-sm text-primary text-label-bold transition-all hover:bg-surface-container">
                                <MdMail className="text-[20px]" />
                                Enviar Invitaciones Masivas
                            </button>
                            <button className="bg-primary cursor-pointer flex font-label-bold gap-2 items-center px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 text-on-primary text-label-bold transition-all hover:scale-[1.01] active:scale-[0.99]">
                                <MdOutlinePersonAddAlt className="text-[20px]" />
                                Crear Nuevo Usuario
                            </button>
                        </>
                    }
                />
                {/* Cards Metrics */}
                <UserMetrics metrics={{}} />
                {/* Filtration & Search */}
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Buscar por nombre, correo institucional o ID..."
                    filters={[                        
                        {
                            key: 'rol',
                            label: 'Rol',
                            value: rol,
                            onChange: setRol,
                            options: roles.map((d) => ({ value: d, label: d })),
                        },
                        {
                            key: 'estado',
                            label: 'Estado',
                            value: estado,
                            onChange: setEstado,
                            options: estados.map((d) => ({ value: d, label: d })),
                        },
                        {
                            key: 'sede',
                            label: 'Todas las Sedes',
                            value: sede,
                            onChange: setSede,
                            options: sedes.map((d) => ({ value: d, label: d })),
                        },
                    ]}
                    onClear={() => {
                        setSearchTerm('');                        
                        setRol('');
                        setEstado('');
                        setSede('');
                    }}
                />
            </section>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>

                ) : (
                    <Table
                        data={filteredRol}
                        columns={columns}
                    />
                )
            }
        </main>
    );
}
export default ListUser;