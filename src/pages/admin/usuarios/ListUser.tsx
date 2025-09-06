import { useEffect, useState } from "react";
//API
import { getUsers } from '../../../api/user.api';
import { getRoles } from "../../../api/roles.api";
//Table
import { createColumnHelper } from '@tanstack/react-table';
import type { ColumnDef } from "@tanstack/react-table";
//Componente principal para la listas
import Table from '../../../components/Table';
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { Rol } from "../../../types/rol.models";
// Dto
import type { ListUserDto } from "../../../types/dto/user.dto";


const ListUser = () => {
    const [ users, setUser ] = useState<ListUserDto[]>([]);
    const [ , setRoles ] = useState<Rol[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const [ userData, rolesData ] = await Promise.all([
                    getUsers(),
                    getRoles(),                    
                ]);
                setRoles(rolesData);
                setUser(userData);
                                              
            }catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            }finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);
  

    const columnHelper = createColumnHelper<ListUserDto>();

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
            id: 'nombre',
            header: 'Nombre Completo',
        }),        
        columnHelper.accessor(row => row.email, {
            id: 'email',
            header: 'Correo',
        }),
        columnHelper.accessor(row => row.rol, {
            id: 'roles',
            header: 'Rol',
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
    ] as ColumnDef<ListUserDto>[];

    return (
        <main className="cards bg-primary w-full flex flex-col justify-center items-center gap-y-4 p-4 rounded-xl">
            <h1 className='text-xl text-white font-bold pb-4 md:text-2xl' >Listado de Usuarios</h1>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>

                ): (
                    <Table 
                        data={users} 
                        columns={columns}                          
                    />
                )
            }               
        </main>
    );
}
export default ListUser;