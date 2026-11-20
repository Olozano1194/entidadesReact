import { MdOutlineSearch, MdKeyboardArrowDown, MdFilterAltOff } from "react-icons/md";



const SearchTeacher = () => {
    

    return (
        < section className="bg-surface-container-lowest flex flex-col gap-4 items-stretch mb-6 p-4 rounded-xl lg:items-center lg:flex-row">
        {/* Smart Search */}
        <section className="flex-1 relative">
            <MdOutlineSearch className="absolute left-3.5 text-outline text-[20px] top-1/2 -translate-y-1/2" />
            <input 
                type="text" 
                className="bg-surface-container-low font-body-md pl-10 pr-4 py-2.5 rounded-lg text-body-md transition-all text-on-surface w-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-outline"
                placeholder="Buscar por nombre o documento" 
            />
        </section>
        {/* Filter Element container */}
        <section className="flex flex-wrap gap-3 items-center sm:flex-nowrap">
            <div className="min-w-[170px] relative w-full sm:w-auto">
                <select 
                    name="" 
                    id=""
                    className="
                        appearance-none bg-surface-container-low cursor-pointer
                        font-label-bold px-3.5 py-2.5 pr-8 rounded-lg
                      text-on-surface text-label-bold w-full
                        border border-transparent
                        focus:outline-none focus:border-primary
                        focus:ring-0 transition-all duration-200"
                >
                    <option value="">Departamento: Todos</option>
                </select>
                <MdKeyboardArrowDown className="absolute pointer-events-none text-outline text-[18px] top-1/2 right-2 -translate-y-1/2" />
            </div>
            <div className="min-w-[150px] relative w-full sm:w-auto">
                <select 
                    name="" 
                    id=""
                    className="
                        appearance-none bg-surface-container-low cursor-pointer
                        font-label-bold px-3.5 py-2.5 pr-8 rounded-lg
                        text-on-surface text-label-bold w-full
                        border border-transparent
                        focus:outline-none focus:border-primary
                        focus:ring-0 transition-all duration-200"
                >
                    <option value="">Sede: Todos</option>
                </select>
                <MdKeyboardArrowDown className="absolute pointer-events-none text-outline text-[18px] top-1/2 right-2 -translate-y-1/2" />
            </div>
            <button className="bg-surface-container-low cursor-pointer flex items-center justify-center p-2.5 rounded-lg text-outline transition-colors hover:bg-surface-container hover:text-on-surface">
                <MdFilterAltOff className="text-[20px]" />
            </button>
        </section>
        </section>        
    );
}
export default SearchTeacher;