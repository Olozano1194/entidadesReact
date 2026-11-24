import { MdSecurity, MdGroup, MdVerifiedUser, MdTrendingUp } from "react-icons/md";
import MetricsSection from '../../../../components/table/MetricsSection';

interface RoleMetricsProps {
    totalRoles: number;
    rolesActivos: number;
    totalPermisos: number;
    usuariosConRol: number;
}

const RoleMetrics = ({ totalRoles, rolesActivos, totalPermisos, usuariosConRol }: RoleMetricsProps) => {
    const metrics = [
        {
            id: 'total',
            title: 'Total Roles',
            value: totalRoles,
            icon: <MdSecurity className="text-[22px]" />,
            blurColor: 'bg-primary-fixed/30',
            footer: <span className="font-body-md text-body-md text-on-surface-variant">Roles del sistema</span>,
        },
        {
            id: 'activos',
            title: 'Roles Activos',
            value: rolesActivos,
            icon: <MdVerifiedUser className="text-[22px]" />,
            blurColor: 'bg-tertiary-fixed/30',
            footer: <span className="font-body-md text-body-md text-on-surface-variant">Habilitados para asignación</span>,
        },
        {
            id: 'permisos',
            title: 'Total Permisos',
            value: totalPermisos,
            icon: <MdTrendingUp className="text-[22px]" />,
            blurColor: 'bg-secondary-fixed/40',
            footer: <span className="font-body-md text-body-md text-on-surface-variant">Acciones registradas</span>,
        },
        {
            id: 'usuarios',
            title: 'Usuarios con Rol',
            value: usuariosConRol,
            icon: <MdGroup className="text-[22px]" />,
            blurColor: 'bg-surface-container-high',
            footer: <span className="font-body-md text-body-md text-on-surface-variant">Asignaciones activas</span>,
        },
    ];
    return <MetricsSection metrics={metrics} columns={4} />;
};

export default RoleMetrics;
