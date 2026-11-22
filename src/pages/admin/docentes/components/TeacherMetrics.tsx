import { TfiIdBadge } from "react-icons/tfi";
import { MdTrendingUp, MdSchedule, MdOutlineTimelapse, MdOutlineStarBorderPurple500 } from "react-icons/md";
import MetricsSection from "../../../../components/table/MetricsSection";

interface TeacherMetricsProps {
    teacherCount: number;
    metrics: {
        tc?: number;
        hc?: number;
        cargaHorariaMedia?: number;
        evaluacionDesempeno?: number;
        acreditacionPct?: number;
        sedes?: number;
        docentesNuevos?: number;
    };
}

const TeacherMetrics = ({ teacherCount, metrics }: TeacherMetricsProps) => {
    const teacherMetrics = [
        {
            id: 'docentes',
            title: 'Docentes Vinculados',
            value: teacherCount,
            icon: <TfiIdBadge className="text-[22px]" />,
            blurColor: 'bg-primary-fixed/30',
            indicator: metrics.docentesNuevos != null ? (
                <span className="font-label-sm font-semibold flex items-center text-tertiary text-label-sm">
                    <MdTrendingUp />
                    +{metrics.docentesNuevos} nuevos
                </span>
            ) : undefined,
            footer: (
                <div className="flex font-label-sm items-center justify-between text-outline text-label-sm">
                    <span>{metrics.acreditacionPct != null ? `${metrics.acreditacionPct}% con acreditación` : 'Acreditación pendiente'}</span>
                    <span className="font-medium text-on-surface">
                        {metrics.sedes != null ? `${metrics.sedes} sedes` : '— sedes'}
                    </span>
                </div>
            ),
        },
        {
            id: 'dedicacion',
            title: 'Dedicación Docente',
            value: (
                <>
                    {metrics.tc ?? '—'}
                    <span className="text-on-surface-variant font-light text-headline-md"> TC</span>
                </>
            ),
            icon: <MdSchedule className="text-[22px]" />,
            iconContainerClass: 'bg-tertiary-fixed/30 text-tertiary',
            blurColor: 'bg-tertiary-fixed/40',
            indicator: (
                <span className="text-outline font-label-bold text-label-bold">
                    / {metrics.hc ?? '—'} HC
                </span>
            ),
            footer: metrics.tc != null && metrics.hc != null ? (
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
                    <div className="bg-primary h-full" style={{ width: `${(metrics.tc / (metrics.tc + metrics.hc)) * 100}%` }}></div>
                    <div className="bg-secondary-fixed-dim h-full" style={{ width: `${(metrics.hc / (metrics.tc + metrics.hc)) * 100}%` }}></div>
                </div>
            ) : undefined,
        },
        {
            id: 'carga',
            title: 'Carga Horaria Media',
            value: metrics.cargaHorariaMedia ?? '—',
            icon: <MdOutlineTimelapse className="text-[22px]" />,
            iconContainerClass: 'bg-secondary-fixed/40 text-secondary',
            blurColor: 'bg-secondary-fixed/40',
            indicator: (
                <span className="font-label-sm font-semibold flex items-center text-outline text-label-sm">
                    hrs / sem
                </span>
            ),
            footer: (
                <div className="flex font-label-sm gap-1.5 items-center text-on-surface-variant text-label-sm">
                    <span className="bg-emerald-500 h-2 rounded-full shrink-0 w-2"></span>
                    <span>Balance óptimo de aula (Norma: 24h)</span>
                </div>
            ),
        },
        {
            id: 'evaluacion',
            title: 'Evaluación Desempeño',
            value: metrics.evaluacionDesempeno ?? '—',
            icon: <MdOutlineStarBorderPurple500 className="text-[22px]" />,
            iconContainerClass: 'bg-primary-fixed/30 text-primary',
            blurColor: 'bg-primary-fixed/30',
            indicator: (
                <span className="font-label-sm font-semibold flex items-center text-outline text-label-sm">
                    / 5.0
                </span>
            ),
            footer: (
                <div className="flex font-label-sm items-center justify-between text-outline text-label-sm">
                    <span>Evaluación por comités estudiantiles</span>
                    <span className="font-medium text-primary">96% rta</span>
                </div>
            ),
        },
    ];

    return <MetricsSection metrics={teacherMetrics} columns={4} />;
};
export default TeacherMetrics;