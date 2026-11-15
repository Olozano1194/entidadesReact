

const Footer = () => {
    return (
        <footer className="border-t border-emerald-100 bg-white mt-auto px-6 py-5">
            <div className="flex flex-col gap-4 items-center justify-between max-w-[1440px] mx-auto sm:flex-row">
                {/* Copyright */}
                <div className="flex flex-col items-center gap-1 sm:items-start">
                    <p className="text-sm font-semibold text-emerald-900">
                        © {new Date().getFullYear()} EduControl
                    </p>
                    <span className="text-xs text-on-surface-variant">
                        Green Valley Academy. Todos los derechos reservados.
                    </span>
                </div>
                {/* Links and version */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="/privacy-policy"
                        className="text-xs text-on-surface-variant transition-colors hover:text-emerald-700"
                    >
                        Politica de Privacidad
                    </a>
                    <span className="h-4 w-px bg-emerald-100"></span>
                    <span className="text-xs text-on-surface-variant">
                        Sistema de gestión académica
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                        v4.2.1
                    </span>
                </div>
            </div>
        </footer>
    )
}
export default Footer