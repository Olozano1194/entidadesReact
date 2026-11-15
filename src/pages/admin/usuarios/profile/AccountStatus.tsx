//icons
import { MdOutlineVerifiedUser, MdOutlineAnalytics, MdOutlineTimelapse } from "react-icons/md";

function AccountStatus() {
    return (
        <section className="mt-6 grid grid-cols-1 gap-gutter md:grid-cols-3">
            <article className="bg-emerald-900 flex items-center justify-between p-8 rounded-xl text-white">
                <div>
                    <p className="font-label-bold mb-1 text-emerald-300 text-label-bold">
                        Estado de la cuenta
                    </p>
                    <h4 className="font-headline-md text-headline-md">Verificada y Activa</h4>
                </div>
                <MdOutlineVerifiedUser className="text-emerald-400 text-4xl" />
            </article>
            <article className="bg-white border border-emerald-50 flex items-center justify-between p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div>
                    <p className="font-label-bold mb-1 text-on-surface-variant text-label-bold">
                        Total de Contribuciones
                    </p>
                    <h4 className="font-headline-md text-headline-md text-primary">1,284 Comportamiento</h4>
                </div>
                <MdOutlineAnalytics className="text-emerald-400 text-4xl" />
            </article>
            <article className="bg-white border border-emerald-50 flex items-center justify-between p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div>
                    <p className="font-label-bold mb-1 text-on-surface-variant text-label-bold">
                        Duración de la sesión
                    </p>
                    <h4 className="font-headline-md text-headline-md text-primary">4h 12m <span className="font-normal text-label-sm text-on-surface-variant">
                        Avg/día</span></h4>
                </div>
                <MdOutlineTimelapse className="text-emerald-400 text-4xl" />
            </article>
        </section>
    );
}
export default AccountStatus;