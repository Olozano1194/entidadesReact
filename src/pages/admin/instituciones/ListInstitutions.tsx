import { useEffect, useState } from "react";
//API
import { getInstitutions } from "../../../api/institution.api";

//Table
import { createColumnHelper } from '@tanstack/react-table';
import type { ColumnDef } from "@tanstack/react-table";
//Componente principal para la listas
import Table from '../../../components/Table';
//Mensajes
import { toast } from 'react-hot-toast';
//Dtos
import type { ListInstitucionDto } from "../../../types/dto/institution.dto";


const ListInstitutions = () => {
    const [ institution, setInstitution ] = useState<ListInstitucionDto[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const institutionData = await getInstitutions();
                // console.log('User data received:', studentData);
                setInstitution(institutionData);                
            }catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            }finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);    

    const columnHelper = createColumnHelper<ListInstitucionDto>();

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
        columnHelper.accessor(row => row.director, {
            id: 'director',
            header: 'Director',
        }),
        columnHelper.accessor(row => row.email, {
            id: 'email',
            header: 'Email',
        }),
        columnHelper.accessor(row => row.nosedes, {
            id: 'nosedes',
            header: 'Sedes',
        }),
        columnHelper.accessor(row => row.telefono, {
            id: 'telefono',
            header: 'Telefono',
        }),
        columnHelper.accessor(row => row.direccion, {
            id: 'direccion',
            header: 'Dirección',
        }),
        columnHelper.accessor(row =>{ 
            if (typeof row.iddepartamento === 'object' && row.iddepartamento !== null) {
                return row.iddepartamento.descripcion;                
            }
        }, {
            id: 'iddepartamento',
            header: 'Departamento',
        }),
        columnHelper.accessor(row => {
            if (typeof row.idmunicipio === 'object' && row.idmunicipio !== null) {
                return row.idmunicipio.descripcion;                
            }
        }, {
            id: 'idmunicipio',
            header: 'Municipio',
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
    ] as ColumnDef<ListInstitucionDto>[];

    return (
        <main className="cards bg-primary w-full flex flex-col justify-center items-center gap-y-4 p-4 rounded-xl">
            <h1 className='text-xl text-white font-bold pb-4 md:text-2xl' >Listado de Instituciones</h1>
            {
                isLoading ? (
                    <div className="text-center py-4">Cargando...</div>

                ): (
                    <Table 
                        data={institution} 
                        columns={columns}                          
                    />
                )
            }               
        </main>
    );
}
export default ListInstitutions;