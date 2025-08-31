import { useEffect, useState } from "react";
//API
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



const ListRoles = () => {
    const [ roles, setRoles ] = useState<Rol[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const rolesData = await getRoles();
                //console.log('User data received:', data);
                setRoles(rolesData);               
                                
            }catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            }finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);
  

    const columnHelper = createColumnHelper<Rol>();

    const columns = [
        columnHelper.accessor((_, index) => index + 1, {
            id: 'index',
            header: 'N°',
            cell: (info) => {
                // Solo mostrar el número si no es la fila de total
                return info.row.index + 1;
            },
        }),        
        columnHelper.accessor(row => row.nombre, {
            id: 'nombre',
            header: 'Nombre',
        }),
        columnHelper.accessor(row => row.descripcion, {
            id: 'despcripcion',
            header: 'Descripción',
        }),
        columnHelper.accessor(row => row.permisos, {
            id: 'permisos',
            header: 'Permisos',
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
    ] as ColumnDef<Rol>[];

    return (
        <main className="cards bg-primary w-full flex flex-col justify-center items-center gap-y-4 p-4 rounded-xl">
            <h1 className='text-xl text-white font-bold pb-4 md:text-2xl' >Listado de Usuarios</h1>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>

                ): (
                    <Table 
                        data={roles} 
                        columns={columns}                          
                    />
                )
            }               
        </main>
    );
}
export default ListRoles;