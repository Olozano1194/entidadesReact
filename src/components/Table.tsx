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
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting 
        },
        onSortingChange: setSorting,              
    });

    const renderSortIcon = (column: Column<T>) => {
        const sortState = column.getIsSorted();
        return {
            'asc': "⬆️",
            'desc': "⬇️",
            'none': "↕️"
        }[sortState || 'none'];
        
    };

    return (
        <main className="cards w-full flex flex-col justify-center items-center gap-y-4 p-4 rounded-xl">
            <div className="overflow-x-auto w-full">                
                <table className="min-w-full border"> 
                    <thead className="bg-secondary-500 text-white text-sm lg:text-lg">
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map(header => (
                                            <th key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="p-2">
                                                    {!header.isPlaceholder &&           flexRender(header.column.columnDef.header, header.getContext()
                                                    )}
                                                    {
                                                      renderSortIcon(header.column)                               
                                                    }                                      
                                            </th>                                        
                                        ))}                                
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody className="text-sm text-white lg:text-lg">
                        {
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="border p-2 text-center">{flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                        {/* Fila del total que estará siempre al final */}
                        { totalRow && (
                            <tr 
                                className="bg-slate-500 text-white font-bold md:text-lg">
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
                {/* contenedor de los btn de paginación */}
                <div className="w-full flex md:justify-center md:items-center gap-x-4 pt-4">
                    <button 
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded disabled:bg-gray-400 md:ml-0" 
                    >
                        Primera Página
                    </button>
                    <button 
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded disabled:bg-gray-400"
                    >
                        Página Anterior
                    </button>
                    <button 
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded disabled:bg-gray-400"
                    >
                        Página Siguiente
                    </button>
                    <button 
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded disabled:bg-gray-400"
                    >
                        Última Página
                    </button>

                </div>
            </div>                      
        </main>
    );
}
export default Table;