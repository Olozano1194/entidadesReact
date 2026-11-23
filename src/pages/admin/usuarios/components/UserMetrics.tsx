import { MdBadge, MdDeviceHub, MdSecurity, MdLockPerson, MdTrendingUp } from "react-icons/md";

interface UserMetricsProps {
    metrics: {
        totalCuentas?: number;
        cuentasVariacion?: number;
        usuariosActivos?: number;
        ratioActivos?: number;
        tfaPct?: number;
        tfaCount?: number;
        cuentasBloqueadas?: number;
        cuentasInactivas?: number;
        desercionProyectada?: number;
        asistenciaDiaria?: number;
        moraBaja?: boolean;
    };
}

const UserMetrics = ({ metrics }: UserMetricsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* KPI 1 - Total Cuentas */}
            <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Total Cuentas</span>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="font-display-xl text-display-xl text-on-surface">
                                {metrics.totalCuentas != null ? metrics.totalCuentas.toLocaleString('es-CO') : '—'}
                            </span>
                            {metrics.cuentasVariacion != null && (
                                <span className="font-label-sm text-label-sm text-primary flex items-center font-bold">
                                    <MdTrendingUp className="text-sm" /> +{metrics.cuentasVariacion}%
                                </span>
                            )}
                        </div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Matrícula y planta global</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary-fixed text-on-primary-fixed">
                        <MdBadge className="text-2xl" />
                    </div>
                </div>
                <div className="mt-4 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
            </div>
            {/* KPI 2 - Usuarios Activos Hoy */}
            <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Usuarios Activos Hoy</span>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="font-display-xl text-display-xl text-on-surface">
                                {metrics.usuariosActivos != null ? metrics.usuariosActivos.toLocaleString('es-CO') : '—'}
                            </span>
                            {metrics.ratioActivos != null && (
                                <span className="font-label-sm text-label-sm text-secondary flex items-center font-semibold">{metrics.ratioActivos}% ratio</span>
                            )}
                        </div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Sesiones registradas en el día</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary-fixed text-on-secondary-fixed">
                        <MdDeviceHub className="text-2xl" />
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    <span className="font-label-sm text-label-sm text-outline">Pico habitual: 10:30 AM - 12:00 PM</span>
                </div>
            </div>
            {/* KPI 3 - Autenticación 2FA */}
            <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Autenticación en 2 Pasos</span>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="font-display-xl text-display-xl text-on-surface">
                                {metrics.tfaPct != null ? `${metrics.tfaPct}%` : '—'}
                            </span>
                            {metrics.tfaCount != null && (
                                <span className="font-label-sm text-label-sm text-primary font-bold">{metrics.tfaCount.toLocaleString('es-CO')} 2FA</span>
                            )}
                        </div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Políticas de seguridad TOTP/SMS</p>
                    </div>
                    <div className="p-3 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed">
                        <MdSecurity className="text-2xl" />
                    </div>
                </div>
                <div className="mt-4 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: metrics.tfaPct != null ? `${metrics.tfaPct}%` : '0%' }}></div>
                </div>
            </div>
            {/* KPI 4 - Cuentas Bloqueadas/Inactivas */}
            <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Cuentas Bloqueadas / Inactivas</span>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="font-display-xl text-display-xl text-error">
                                {metrics.cuentasBloqueadas != null ? metrics.cuentasBloqueadas : '—'}
                            </span>
                            {metrics.cuentasBloqueadas != null && metrics.cuentasBloqueadas > 0 && (
                                <span className="font-label-sm text-label-sm text-error bg-error-container px-2 py-0.5 rounded-full font-bold">Atención</span>
                            )}
                        </div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Revisión preventiva de acceso</p>
                    </div>
                    <div className="p-3 rounded-lg bg-error-container text-on-error-container">
                        <MdLockPerson className="text-2xl" />
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-label-sm font-label-sm">
                    <span className="text-outline">{metrics.cuentasInactivas != null ? `${metrics.cuentasInactivas} por contraseña expirada` : '5 por contraseña expirada'}</span>
                    <button className="text-primary font-semibold hover:underline">Resolver</button>
                </div>
            </div>
        </div>
    );
};
export default UserMetrics;