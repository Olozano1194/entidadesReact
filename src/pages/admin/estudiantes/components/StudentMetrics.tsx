import { MdOutlineHowToReg, MdTrendingUp, MdOutlineStarBorderPurple500, MdOutlineTimelapse } from "react-icons/md";
import MetricsSection from "../../../../components/table/MetricsSection";

interface StudentMetricsProps {
    metrics: {
        matriculaActiva?: number;
        matriculaVariacion?: number;
        capacidadProyectadaPct?: number;
        nuevosIngresos?: number;
        nuevosIngresosVariacion?: number;
        nuevosIngresosTendencia?: 'up' | 'down';
        promedioGeneral?: number;
        promedioNivel?: string;
        retencionPct?: number;
        metaRetencion?: number;
        desercionProyectada?: number;
        asistenciaDiaria?: number;
        moraBaja?: boolean;
    };
}

const StudentMetrics = ({ metrics }: StudentMetricsProps) => {
    const studentMetrics = [
        {
            id: 'matricula',
            title: 'Matrícula Activa',
            value: metrics.matriculaActiva != null ? metrics.matriculaActiva.toLocaleString('es-CO') : '—',
            icon: <MdOutlineHowToReg className="text-[22px]" />,
            blurColor: 'bg-primary-fixed/30',
            indicator: metrics.matriculaVariacion != null ? (
                <span className={`font-label-sm font-semibold flex items-center text-label-sm ${metrics.matriculaVariacion >= 0 ? 'text-tertiary' : 'text-error'}`}>
                    {metrics.matriculaVariacion >= 0 ? '+' : ''}{metrics.matriculaVariacion}%
                </span>
            ) : undefined,
            footer: metrics.capacidadProyectadaPct != null
                ? `capacidad total proyectada · ${metrics.capacidadProyectadaPct}%`
                : 'capacidad total proyectada',
        },
        {
            id: 'ingresos',
            title: 'Nuevos Ingresos',
            value: metrics.nuevosIngresos != null ? metrics.nuevosIngresos.toLocaleString('es-CO') : '—',
            icon: <MdTrendingUp className="text-[22px]" />,
            blurColor: 'bg-secondary-fixed/40',
            indicator: metrics.nuevosIngresosVariacion != null ? (
                <span className={`font-label-sm font-semibold flex items-center text-label-sm ${metrics.nuevosIngresosTendencia === 'down' ? 'text-error' : 'text-tertiary'}`}>
                    {metrics.nuevosIngresosTendencia === 'down' ? '↓' : '↑'} {Math.abs(metrics.nuevosIngresosVariacion)}%
                </span>
            ) : undefined,
            footer: 'primaria y bachillerato regular',
        },
        {
            id: 'promedio',
            title: 'Promedio General',
            value: metrics.promedioGeneral != null ? metrics.promedioGeneral.toFixed(1) : '—',
            icon: <MdOutlineStarBorderPurple500 className="text-[22px]" />,
            blurColor: 'bg-tertiary-fixed/40',
            indicator: metrics.promedioNivel ? (
                <span className="font-label-sm font-semibold flex items-center text-label-sm bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full">
                    {metrics.promedioNivel}
                </span>
            ) : undefined,
            footer: 'corte evaluativo semestral',
        },
        {
            id: 'retencion',
            title: 'Retención & Asistencia',
            value: metrics.retencionPct != null ? `${metrics.retencionPct}%` : '—',
            icon: <MdOutlineTimelapse className="text-[22px]" />,
            blurColor: 'bg-surface-container-high',
            footer: (
                <div className="flex flex-col gap-1 text-label-sm text-outline">
                    <div className="flex items-center justify-between">
                        <span>Meta &gt;{metrics.metaRetencion ?? 95}%</span>
                        {metrics.desercionProyectada != null && (
                            <span>Deserción proyectada: {metrics.desercionProyectada}%</span>
                        )}
                    </div>
                    {metrics.asistenciaDiaria != null && (
                        <div className="flex items-center justify-between">
                            <span>Asistencia diaria: {metrics.asistenciaDiaria}%</span>
                            {metrics.moraBaja && <span className="font-medium text-tertiary">Mora baja</span>}
                        </div>
                    )}
                </div>
            ),
        },
    ];
    return <MetricsSection metrics={studentMetrics} columns={4} />;
};
export default StudentMetrics;