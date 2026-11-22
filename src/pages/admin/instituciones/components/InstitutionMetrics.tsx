import { MdAccountBalance, MdShareLocation, MdGroups, MdVerifiedUser, MdTrendingUp, MdCheckCircle } from "react-icons/md";
import MetricsSection from "../../../../components/table/MetricsSection";

interface InstitutionMetricsProps {
    totalInstitutions: number;
    totalSedes: number;
    totalEstudiantes: number;
}

const InstitutionMetrics = ({ totalInstitutions, totalSedes, totalEstudiantes }: InstitutionMetricsProps) => {
    const metrics = [
        {
            id: 'total',
            title: 'Total Registradas',
            value: totalInstitutions,
            icon: <MdAccountBalance className="text-[22px]" />,
            iconContainerClass: 'bg-surface-container-low text-primary',
            blurColor: 'bg-primary/5',
            indicator: (
                <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                    <MdTrendingUp className="text-sm font-semibold" /> +3 federadas este trimestre
                </span>
            ),
            footer: <span className="font-body-md text-body-md text-on-surface-variant">Colegios</span>,
        },
        {
            id: 'sedes',
            title: 'Campuses & Sedes',
            value: totalSedes,
            icon: <MdShareLocation className="text-[22px]" />,
            iconContainerClass: 'bg-secondary-container/40 text-secondary',
            blurColor: 'bg-tertiary-fixed/30',
            footer: (
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <MdShareLocation className="text-sm" /> Promedio {(totalInstitutions ? (totalSedes / totalInstitutions).toFixed(1) : 0)} sedes / colegio
                </span>
            ),
        },
        {
            id: 'matricula',
            title: 'Matrícula General',
            value: totalEstudiantes > 1000 ? `${(totalEstudiantes / 1000).toFixed(1)}k` : totalEstudiantes,
            icon: <MdGroups className="text-[22px]" />,
            iconContainerClass: 'bg-surface-container-low text-primary-container',
            blurColor: 'bg-primary-fixed/40',
            indicator: (
                <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                    <MdCheckCircle className="text-sm font-semibold" /> 91% cupos asignados
                </span>
            ),
            footer: <span className="font-body-md text-body-md text-on-surface-variant">Alumnos</span>,
        },
        {
            id: 'licencias',
            title: 'Cumplimiento Licencias',
            value: '96%',
            icon: <MdVerifiedUser className="text-[22px]" />,
            iconContainerClass: 'bg-surface-container-low text-primary',
            blurColor: 'bg-error-container/40',
            footer: (
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-error inline-block"></span>
                    4 convenios por renovar
                </span>
            ),
        },
    ];

    return <MetricsSection metrics={metrics} columns={4} />;
};
export default InstitutionMetrics;