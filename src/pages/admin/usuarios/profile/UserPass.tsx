//icons
import { RiHistoryLine } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";


function UserPass() {  
    

    return (
        <>
        {/* Usuario y contraseña */}
        <section className="flex flex-col gap-gutter">
            <div className="bg-white border border-emerald-50 p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <h3 className="font-headline-md flex gap-3 items-center mb-6 text-headline-md text-primary md:text-2xl">
                    <IoIosLock />
                    Seguridad
                </h3>
                <form className="flex flex-col gap-form-stack">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="" className="font-label-sm text-label-sm text-on-surface-variant">
                            Contraseña Actual
                        </label>
                        <input type="password" className="border border-outline-variant px-3 py-2.5 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="********" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="" className="font-label-sm text-label-sm text-on-surface-variant">
                            Nueva Contraseña
                        </label>
                        <input type="password" className="border border-outline-variant px-3 py-2.5 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="********" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="" className="font-label-sm text-label-sm text-on-surface-variant">
                            Confirmar Contraseña
                        </label>
                        <input type="password" className="border border-outline-variant px-3 py-2.5 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary" placeholder="********" />
                    </div>
                    <button className="border-2 border-emerald-100 cursor-pointer font-label-bold mt-2 py-2.5 rounded-lg text-primary text-label-bold transition-colors w-full hover:bg-emerald-50">
                        Actualizar Contraseña
                    </button>
                </form>
            </div>
            {/* Activity Summary */}
            <article className="bg-white border border-emerald-50 p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="flex font-headline-md gap-3 items-center text-headline-md text-primary">
                        <RiHistoryLine />
                        Actividad
                    </h3>
                    <span className="bg-emerald-50 font-label-sm px-2 py-1 rounded text-label-sm text-emerald-600">
                        Ultimos 7 días
                    </span>
                </div>
                <section className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                        <div className="bg-primary-container p-2 rounded-lg text-on-primary-container">
                            <MdOutlineSecurity className="text-[20px]" />
                        </div>
                        <div>
                            <p className="font-label-bold text-label-bold text-on-surface">
                                Permisos de usuarios actualizados
                            </p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                ayer a las 2:45 PM
                            </p>
                        </div>                        
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="bg-primary-container p-2 rounded-lg text-on-primary-container">
                            <MdOutlineSecurity className="text-[20px]" />
                        </div>
                        <div>
                            <p className="font-label-bold text-label-bold text-on-surface">
                                Informe mensual generado
                            </p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                Oct 12, 2023
                            </p>
                        </div>                        
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="bg-primary-container p-2 rounded-lg text-on-primary-container">
                            <MdOutlineSecurity className="text-[20px]" />
                        </div>
                        <div>
                            <p className="font-label-bold text-label-bold text-on-surface">
                                Inicio de sesión en el sistema
                            </p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                                Oct 11, 2024 * 9:12 AM
                            </p>
                        </div>                        
                    </div>                    
                </section>
                <a className="block cursor-pointer font-label-bold mt-6 text-center text-label-bold text-primary hover:underline decoration-2 underline-offset-4">
                    Ver toda la actividad                   
                </a>
            </article>

        </section>
        </>
    );
}
export default UserPass;