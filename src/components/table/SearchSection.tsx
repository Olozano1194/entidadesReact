import { MdOutlineSearch, MdKeyboardArrowDown, MdFilterAltOff } from "react-icons/md";

export interface SearchSectionFilterOption {
    value: string;
    label: string;
}

export interface SearchSectionFilter {
    key: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SearchSectionFilterOption[];
}

export interface SearchSectionProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    filters?: SearchSectionFilter[];
    onClear: () => void;
}

const SearchSection = ({
    searchTerm,
    onSearchChange,
    placeholder = "Buscar...",
    filters = [],
    onClear,
}: SearchSectionProps) => {
    return (
        <section className="bg-surface-container-lowest flex flex-col gap-4 items-stretch mb-6 p-4 rounded-xl lg:items-center lg:flex-row">
            {/* Smart Search */}
            <section className="flex-1 relative">
                <MdOutlineSearch className="absolute left-3.5 text-outline text-[20px] top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="bg-surface-container-low font-body-md pl-10 pr-4 py-2.5 rounded-lg text-body-md transition-all text-on-surface w-full focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-outline"
                    placeholder={placeholder}
                />
            </section>
            {/* Filter Element container */}
            <section className="flex flex-wrap gap-3 items-center sm:flex-nowrap">
                {filters.map((filter) => (
                    <div key={filter.key} className="min-w-[170px] relative w-full sm:w-auto">
                        <select
                            value={filter.value}
                            onChange={(e) => filter.onChange(e.target.value)}
                            className="
                                appearance-none bg-surface-container-low cursor-pointer
                                font-label-bold px-3.5 py-2.5 pr-8 rounded-lg
                              text-on-surface text-label-bold w-full
                                border border-transparent
                                focus:outline-none focus:border-primary
                                focus:ring-0 transition-all duration-200"
                        >
                            <option value="">{filter.label}: Todos</option>
                            {filter.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <MdKeyboardArrowDown className="absolute pointer-events-none text-outline text-[18px] top-1/2 right-2 -translate-y-1/2" />
                    </div>
                ))}
                <button
                    onClick={onClear}
                    className="bg-surface-container-low cursor-pointer flex items-center justify-center p-2.5 rounded-lg text-outline transition-colors hover:bg-surface-container hover:text-on-surface"
                >
                    <MdFilterAltOff className="text-[20px]" />
                </button>
            </section>
        </section>
    );
};
export default SearchSection;