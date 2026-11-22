import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function PaginationSection({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
        start = 1;
        end = Math.min(totalPages, maxVisible);
    }

    if (currentPage > totalPages - 3) {
        start = Math.max(1, totalPages - maxVisible + 1);
        end = totalPages;
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <nav className="bg-surface-container-low flex flex-col font-label-sm gap-4 items-center justify-between p-4 text-label-sm text-outline sm:flex-row">
            <div className="flex gap-3 items-center">
                <span className="text-on-surface-variant">Filas por página:</span>
                <select name="" id="" className="bg-surface-container-lowest cursor-pointer font-semibold outline-none px-2.5 py-1 rounded  text-on-surface">
                    <option value="">10</option>
                    <option value="" selected>25</option>
                    <option value="">50</option>
                    <option value="">100</option>
                </select>
                <span className="text-outline">1-6 de 2.450 docentes</span>
            </div>
            <div className="flex gap-1.5 items-center">
                {/* Flecha izquierda */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-surface-container border border-outline-variant cursor-pointer flex items-center justify-center h-10 p-2 rounded-lg text-on-surface transition-colors hover:bg-surface-container-high disabled:opacity-40"
                >
                    <FaChevronLeft />
                </button>
                {/* Primera página + ... */}
                {start > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="border border-outline-variant cursor-pointer h-8 rounded-lg transition-colors w-8 hover:bg-surface-container"
                        >
                            1
                        </button>

                        {start > 2 && (
                            <span className="px-1 text-outline">...</span>
                        )}
                    </>
                )}
                {/* Páginas visibles */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`border cursor-pointer h-8 rounded-lg transition w-8 ${currentPage === page
                                ? "bg-primary font-semibold text-white"
                                : "border-outline-variant hover:bg-surface-container-highest"
                            }`}
                    >
                        {page}
                    </button>
                ))}                
                {/* ... + última página */}
                {end < totalPages && (
                    <>
                        {end < totalPages - 1 && (
                            <span className="px-1 text-outline">...</span>
                        )}

                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="border border-outline-variant cursor-pointer h-8 rounded-lg text-on-surface transition-colors w-8 hover:bg-surface-container-high"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                {/* Flecha derecha */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-surface-container border border-outline-variant cursor-pointer flex items-center justify-center h-8 p-2 rounded-lg text-on-surface transition-colors hover:bg-surface-container-high disabled:opacity-40"
                >
                    <FaChevronRight />
                </button>
            </div>
        </nav>
    );
}