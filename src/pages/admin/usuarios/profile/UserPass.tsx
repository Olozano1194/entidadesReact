import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
//icons
import { MdOutlineSecurity, MdOutlineVisibility, MdOutlineVisibilityOff, } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { changePassword, getUserProfile } from "../../../../api/user.api";
import { getActividades, type Actividad } from "../../../../api/actividad.api";

const LIMITE_MENSUAL = 3;

const UserPass = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [changesThisMonth, setChangesThisMonth] = useState(0);
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [loadingActividades, setLoadingActividades] = useState(true);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const data = await getActividades();
                setActividades(data);
            } catch (error) {
                console.error('Error al cargar actividades:', error);
            } finally {
                setLoadingActividades(false);
            }
        };
        const fetchPasswordStatus = async () => {
            try {
                const profile = await getUserProfile();
                const changes = profile?.user?.passwordChanges ?? [];
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const count = changes.filter((d: string) => new Date(d) >= startOfMonth).length;
                setChangesThisMonth(count);
            } catch (error) {
                console.error('Error al cargar estado de contraseña:', error);
            }
        };
        fetchActividades();
        fetchPasswordStatus();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        if (newPassword.length < 8) {
            toast.error('La nueva contraseña debe tener al menos 8 caracteres');
            return;
        }
        setLoading(true);
        try {
            const res = await changePassword(currentPassword, newPassword);
            setChangesThisMonth(res.changesThisMonth ?? changesThisMonth + 1);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            toast.success(res.message ?? 'Contraseña actualizada correctamente');
            // recargar actividades
            const data = await getActividades();
            setActividades(data);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error al cambiar la contraseña';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const restantes = Math.max(0, LIMITE_MENSUAL - changesThisMonth);

    const handlePass = () => setShowCurrentPass(!showCurrentPass);
    const handleNewPass = () => setShowNewPass(!showNewPass);
    const handleConfirmPass = () => setShowConfirmPass(!showConfirmPass);

    return (
        <section className="flex flex-col gap-gutter">
            {/* Seguridad / cambio de contraseña */}
            <div className="bg-white border border-emerald-50 p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <h3 className="font-headline-md flex gap-3 items-center mb-6 text-headline-md text-primary md:text-2xl">
                    Seguridad
                </h3>
                <form className="flex flex-col gap-form-stack" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="currentPassword" className="font-label-sm text-label-sm text-on-surface-variant">
                            Contraseña Actual
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-outline"><RiLockPasswordLine /></span>
                            <input
                                id="currentPassword"
                                type={showCurrentPass ? 'text' : 'password'}
                                className="border border-outline-variant pl-10 px-3 py-2.5 rounded-lg text-sm w-full focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="********"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={handlePass} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-on-surface-variant">
                                {showCurrentPass ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="newPassword" className="font-label-sm text-label-sm text-on-surface-variant">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-outline"><RiLockPasswordLine /></span>
                            <input
                                id="newPassword"
                                type={showNewPass ? 'text' : 'password'}
                                className="border border-outline-variant pl-10 px-3 py-2.5 rounded-lg text-sm w-full focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="********"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                            <button type="button" onClick={handleNewPass} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-on-surface-variant">
                                {showNewPass ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="confirmPassword" className="font-label-sm text-label-sm text-on-surface-variant">
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-outline"><RiLockPasswordLine /></span>
                            <input
                                id="confirmPassword"
                                type={showConfirmPass ? 'text' : 'password'}
                                className="border border-outline-variant pl-10 px-3 py-2.5 rounded-lg text-sm w-full focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                            <button type="button" onClick={handleConfirmPass} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-on-surface-variant">
                                {showConfirmPass ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                        Cambios usados este mes: {changesThisMonth} de {LIMITE_MENSUAL}. Restantes: {restantes}.
                    </p>
                    <button
                        type="submit"
                        disabled={loading || restantes === 0}
                        className="border-2 border-emerald-100 cursor-pointer font-label-bold mt-2 py-2.5 rounded-lg text-primary text-label-bold transition-colors w-full hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                    </button>
                </form>
            </div>

            {/* Actividad */}
            <article className="bg-white border border-emerald-50 p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="flex font-headline-md gap-3 items-center text-headline-md text-primary">
                        Actividad
                    </h3>
                    <span className="bg-emerald-50 font-label-sm px-2 py-1 rounded text-label-sm text-emerald-600">
                        Últimos 7 días
                    </span>
                </div>
                <section className="flex flex-col gap-4">
                    {loadingActividades ? (
                        <p className="text-sm text-on-surface-variant">Cargando actividad...</p>
                    ) : actividades.length === 0 ? (
                        <p className="text-sm text-on-surface-variant">No hay actividad reciente.</p>
                    ) : (
                        actividades.map((act) => (
                            <div key={act.id} className="flex gap-4 items-start">
                                <div className="bg-primary-container p-2 rounded-lg text-on-primary-container">
                                    <MdOutlineSecurity className="text-[20px]" />
                                </div>
                                <div>
                                    <p className="font-label-bold text-label-bold text-on-surface">
                                        {act.descripcion}
                                    </p>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                                        {new Date(act.fecha).toLocaleString('es-CO')}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </section>
                <a className="block cursor-pointer font-label-bold mt-6 text-center text-label-bold text-primary hover:underline decoration-2 underline-offset-4">
                    Ver toda la actividad
                </a>
            </article>
        </section>
    );
};

export default UserPass;