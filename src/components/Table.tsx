import { useState } from "react";
// Table
import { 
    useReactTable, 
    flexRender, 
    getCoreRowModel, 
    getPaginationRowModel, 
    getSortedRowModel,    
} from '@tanstack/react-table';
import type {
    ColumnDef, 
    SortingState,
    Column,
} from '@tanstack/react-table';
// Components
import PaginationSection from "./table/PaginationSection";
// Icons
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { BsArrowsVertical } from "react-icons/bs";


interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    totalRow?: Partial<T> & { id?: number | string };
};


const Table = <T,> ({ data, columns, totalRow }: TableProps<T>) => {
    //const [users, setUser] = useState([]);    
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 5 },
        },
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting 
        },
        onSortingChange: setSorting,              
    });

    const renderSortIcon = (column: Column<T>) => {
        const sortState = column.getIsSorted();
        return {
            'asc': <GoArrowUp />,
            'desc': <GoArrowDown />,
            'none': <BsArrowsVertical />
        }[sortState || 'none'];        
    };

    return (
        <main className="bg-surface-container-lowest mb-6 overflow-hidden rounded-xl shadow-sm">
            <section className="overflow-x-auto">                
                <table className="min-w-full text-left"> 
                    <thead>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="bg-surface-container-low font-label-bold text-label-bold text-on-surface-variant tracking-wide">
                                    {
                                        headerGroup.headers.map(header => (
                                            <th key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="py-4 px-6 text-center"
                                            >
                                                {!header.isPlaceholder && (
                                                    <div className="flex items-center">
                                                        <span>
                                                            {
                                                                flexRender(header.column.columnDef.header, header.getContext()
                                                            )}
                                                        </span>
                                                        <span className="shrink-0">
                                                            {
                                                                renderSortIcon(header.column)  
                                                            } 
                                                        </span>
                                                    </div>
                                                )}                                     
                                            </th>                                        
                                        ))}                                
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody className="font-body-md divide-y-0 text-body-md text-on-surface">
                        {
                            table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="py-8 text-center text-on-surface-variant">
                                        No hay datos para mostrar
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="group transition-colors hover:bg-surface-container-low/60">
                                        {
                                            row.getVisibleCells().map(cell => (
                                                <td key={cell.id} className="py-4 px-4 text-center text-on-surface-variant">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            )
                        }
                        {/* Fila del total que estará siempre al final */}
                        { totalRow && (
                            <tr 
                                className="bg-on-surface-variant text-outline-variant font-bold md:text-lg">
                                {table.getAllColumns().map((column) => {
                                    const accessorKey = column.id;
                                    const value = totalRow[accessorKey as keyof typeof totalRow] ?? '';

                                    return (
                                        <td key={column.id} className="border p-2">
                                            {String(value)}
                                        </td>
                                    );
                                })}                               
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            {/* contenedor de los btn de paginación */}
            <PaginationSection
                currentPage={table.getState().pagination.pageIndex + 1}
                totalPages={table.getPageCount()}
                onPageChange={(page: number) => table.setPageIndex(page - 1)}                     
            />                      
        </main>
    );
}
export default Table;