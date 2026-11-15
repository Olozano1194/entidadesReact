//icons
import { useEffect, useState } from "react";
import { MdOutlineVerifiedUser, MdOutlineAnalytics, MdOutlineTimelapse } from "react-icons/md";
import { getUsers } from "../../../../api/user.api";

function AccountStatus() {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [sessionTime, setSessionTime] = useState<string>('0m');
    const isActive = !!localStorage.getItem('token');

    useEffect(() => {
        const fetch = async () => {
            try {
                const users = await getUsers();
                setTotalUsers(Array.isArray(users) ? users.length : 0);
            } catch {
                setTotalUsers(0);
            }
        };
        fetch();

        const loginTime = localStorage.getItem('loginTime');
        if (loginTime) {
            const diff = Date.now() - parseInt(loginTime, 10);
            const hours = Math.floor(diff / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            setSessionTime(hours > 0 ? `${hours}h ${mins}m` : `${mins}m`);
        }
    }, []);

    return (
        <section className="mt-6 grid grid-cols-1 gap-gutter md:grid-cols-3">
            <article className="bg-emerald-900 flex items-center justify-between p-8 rounded-xl text-white">
                <div>
                    <p className="font-label-bold mb-1 text-emerald-300 text-label-bold">
                        Estado de la cuenta
                    </p>
                    <h4 className="font-headline-md text-headline-md">{isActive ? 'Verificada y Activa' : 'Inactiva'}</h4>
                </div>
                <MdOutlineVerifiedUser className="text-emerald-400 text-4xl" />
            </article>
            <article className="bg-white border border-emerald-50 flex items-center justify-between p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div>
                    <p className="font-label-bold mb-1 text-on-surface-variant text-label-bold">
                        Total de Usuarios
                    </p>
                    <h4 className="font-headline-md text-headline-md text-primary">{totalUsers}</h4>
                </div>
                <MdOutlineAnalytics className="text-emerald-400 text-4xl" />
            </article>
            <article className="bg-white border border-emerald-50 flex items-center justify-between p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div>
                    <p className="font-label-bold mb-1 text-on-surface-variant text-label-bold">
                        Duración de la sesión
                    </p>
                    <h4 className="font-headline-md text-headline-md text-primary">{sessionTime}</h4>
                </div>
                <MdOutlineTimelapse className="text-emerald-400 text-4xl" />
            </article>
        </section>
    );
}
export default AccountStatus;