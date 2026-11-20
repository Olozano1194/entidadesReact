import { TfiIdBadge } from "react-icons/tfi";
import { MdTrendingUp, MdSchedule, MdOutlineTimelapse, MdOutlineStarBorderPurple500 } from "react-icons/md";

interface TeacherMetricsProps {
    teacherCount: number;
    metrics: {
        tc?: number;
        hc?: number;
        cargaHorariaMedia?: number;
        evaluacionDesempeno?: number;
        acreditacionPct?: number;
        sedes?: number;
    };
}

const TeacherMetrics = ({ teacherCount, metrics }: TeacherMetricsProps) => {
    return (
        <section className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <article className="bg-surface-container-lowest flex flex-col justify-between overflow-hidden p-5 relative rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="font-label-bold text-label-bold text-outline">
                        Docentes Vinculados
                    </span>
                    <div className="bg-secondary-container/40 flex h-10 items-center justify-center rounded-lg text-primary w-10">
                        <TfiIdBadge className="text-[22px]" />
                    </div>
                </div>
                <div className="flex gap-2 items-baseline mt-4">
                    <span className="font-display-xl font-bold text-display-xl text-on-surface">{teacherCount}</span>
                    <span className="font-label-sm font-semibold flex items-center text-tertiary text-label-sm">
                        <MdTrendingUp />
                        +14 nuevos
                    </span>
                </div>
                <div className="flex font-label-sm items-center justify-between mt-3 text-outline text-label-sm">
                    <span>{metrics.acreditacionPct != null ? `${metrics.acreditacionPct}% con acreditación` : 'Acreditación pendiente'}</span>
                    <span className="font-medium text-on-surface">
                        {metrics.sedes != null ? `${metrics.sedes} sedes` : '— sedes'}
                    </span>
                </div>
            </article>
            {/* Card 2 */}
            <article className="bg-surface-container-lowest flex flex-col justify-between overflow-hidden p-5 relative rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="font-label-bold text-label-bold text-outline">
                        Dedicación Docente
                    </span>
                    <div className="bg-secondary-container/40 flex h-10 items-center justify-center rounded-lg text-primary w-10">
                        <MdSchedule className="text-[22px]" />
                    </div>
                </div>
                <div className="flex gap-2 items-baseline mt-4">
                    <span className="font-display-xl font-bold text-display-xl text-on-surface">
                        {metrics.tc ?? '—'}
                        <span className="font-light text-on-surface-variant text-headline-md uppercase"> tc</span>
                    </span>
                    <span className="font-label-bold text-outline text-label-bold">
                        / {metrics.hc ?? '—'} HC
                    </span>
                </div>
                <div className="bg-surface-container-high flex h-2 mt-3 overflow-hidden rounded-full text-outline text-label-sm w-full">
                    <div className="bg-primary h-full"></div>
                    <div className="bg-secondary-fixed-dim h-full"></div>
                </div>
            </article>
            {/* Card 3 */}
            <article className="bg-surface-container-lowest flex flex-col justify-between overflow-hidden p-5 relative rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="font-label-bold text-label-bold text-outline">
                        Carga Horaria Media
                    </span>
                    <div className="bg-secondary-container/40 flex h-10 items-center justify-center rounded-lg text-primary w-10">
                        <MdOutlineTimelapse className="text-[22px]" />
                    </div>
                </div>
                <div className="flex gap-2 items-baseline mt-4">
                    <span className="font-display-xl font-bold text-display-xl text-on-surface">{metrics.cargaHorariaMedia ?? '—'}</span>
                    <span className="font-label-sm font-semibold flex items-center text-outline text-label-sm">
                        hrs / sem
                    </span>
                </div>
                <div className="flex font-label-sm gap-1.5 items-center mt-3 text-on-surface-variant text-label-sm">
                    <span className="bg-emerald-500 h-2 rounded-full shrink-0 w-2"></span>
                    <span>
                        Balance óptimo de aula (Norma: 24h)
                    </span>
                </div>
            </article>
            {/* Card 4 */}
            <article className="bg-surface-container-lowest flex flex-col justify-between overflow-hidden p-5 relative rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="font-label-bold text-label-bold text-outline">
                        Evaluación Desempeño
                    </span>
                    <div className="bg-secondary-container/40 flex h-10 items-center justify-center rounded-lg text-primary w-10">
                        <MdOutlineStarBorderPurple500 className="text-[22px]" />
                    </div>
                </div>
                <div className="flex gap-2 items-baseline mt-4">
                    <span className="font-display-xl font-bold text-display-xl text-on-surface">{metrics.evaluacionDesempeno ?? '—'}</span>
                    <span className="font-label-sm font-semibold flex items-center text-outline text-label-sm">
                        / 5.0
                    </span>
                </div>
                <div className="flex font-label-sm items-center justify-between mt-3 text-outline text-label-sm">
                    <span>Evaluación por comités estudiantiles</span>
                    <span className="font-medium text-primary">
                        96% rta
                    </span>
                </div>
            </article>
        </section>
    );
};
export default TeacherMetrics;