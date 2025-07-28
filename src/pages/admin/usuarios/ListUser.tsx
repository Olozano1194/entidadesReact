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
import type { User } from '../../../model/user.model';
import type { Rol } from "../../../model/rol.models";



const ListUser = () => {
    const [ users, setUser ] = useState<User[]>([]);
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
                //console.log('User data received:', data);
                setRoles(rolesData);
                
                // Asignamos el nombre del rol
                const usersWithRoles = userData.map((user) => {
                    const rol = rolesData.find((rol) => rol._id === user.rol);
                    return {
                        ...user,
                        rol: rol ? rol.nombre : 'Rol no encontrado',
                    };
                });
                setUser(usersWithRoles);                
            }catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            }finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    // useEffect(() => {
    //         const fetchData = async () => {
    //             setIsLoading(true);
    //             try {                    
    //                 //obtenemos datos del usuario y rol
    //                 const [userData, rolesData] = await Promise.all([
    //                     getUsers(),
    //                     getRoles()
    //                 ]);
    //                 //console.log('Respuesta del servidor:', userData);                                   
    //                 setRoles(rolesData);                              
                    
    //                 if (userData && userData.user) {                        
    //                     //console.log('Datos de usuario:', userData.user);
    //                     let rolId = '';
    //                     if (typeof userData.user.rol === 'string') {
    //                         rolId = userData.user.rol;
    //                     } else if (userData.user.rol && '_id' in userData.user.rol) {
    //                         rolId = userData.user.rol._id;
    //                     }

    //                     setUser(prevUsers => [
    //                         ...prevUsers,
    //                         {
    //                             ...userData.user,
    //                             rol: rolId
    //                         }
    //                     ]);                                                        
    //                 }else {
    //                     console.log('Datos de usuario faltantes:', userData);
    //                     toast.error('Error al obtener datos del usuario');
    //                 }                
    //             }catch (error) {
    //                 const errorMessage = error instanceof Error ? error.message : 'Error al mostrar el perfil del usuario';
    //                 toast.error(errorMessage, {
    //                     duration: 3000,
    //                     position: 'bottom-right',
    //                 });  
    //             } finally {
    //                 setIsLoading(false);
    //             }
    //         };
    //         fetchData();
    //     }, []);

    const columnHelper = createColumnHelper<User>();

    const columns = [
        columnHelper.accessor((_, index) => index + 1, {
            id: 'index',
            header: 'N°',
            cell: (info) => {
                // Solo mostrar el número si no es la fila de total
                return info.row.index + 1;
            },
        }),
        columnHelper.accessor(row => `${row.nombre}`, {
            id: 'name',
            header: 'Nombre',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor(row => row.apellido, {
            id: 'lastname',
            header: 'Apellido',
            cell: (info) => info.getValue(),
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
    ] as ColumnDef<User>[];

    return (
        <main className="cards bg-secondary w-full flex flex-col justify-center items-center gap-y-4 p-4 rounded-xl">
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