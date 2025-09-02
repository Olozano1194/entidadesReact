import { useState, useEffect } from 'react';
import { getUsers } from '../../../api/user.api';
import { getStudent } from '../../../api/student.api';
import { getTeacher } from '../../../api/teacher.api';
import { getInstitutions } from '../../../api/institution.api';
import HomeCard from './HomeCard';
import ActionButton from './ActionButton';
import LineChart from './LineChart';

const HomeAdmin = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalInstitutions: 0,
        // recentUsers: []
    });
    const [loading, setLoading] = useState(true);

    const fetchHomeData = async () => {
        try {
            const [ users, students, teachers, institutions ] = await Promise.all([
                getUsers(),
                getStudent(),
                getTeacher(),
                getInstitutions()
            ]);
            setStats({
                totalUsers: users.length,
                totalStudents: students.length,
                totalTeachers: teachers.length,
                totalInstitutions: institutions.length,
                // recentUsers: users.slice(-5).reverse()
            });
        } catch (error) {
            console.error("Error fetching home data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeData();
    });

    if (loading) {
        return <div className="flex justify-center items-center h-64">Cargando...</div>;
    }


    return(
        <div className="space-y-6">
            {/* Header de bienvenida */}
            <div>
                <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
                <p className="text-primary">Resumen general del sistema</p>
            </div>
            {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <HomeCard 
                    title="Total Usuarios" 
                    value={stats.totalUsers} 
                    icon="👥" 
                    color="blue"
                    // subtitle="En el sistema"
                />
                <HomeCard 
                    title="Estudiantes" 
                    value={stats.totalStudents} 
                    icon="🎓" 
                    color="green"
                    // subtitle="Registrados"
                />
                <HomeCard 
                    title="Docentes" 
                    value={stats.totalTeachers} 
                    icon="👨‍🏫" 
                    color="purple"
                    // subtitle="Activos"
                />
                <HomeCard 
                    title="Instituciones" 
                    value={stats.totalInstitutions} 
                    icon="🏫" 
                    color="orange"
                    // subtitle="Creadas"
                />
            </div>
            {/* Gráfico rápido */}
            <div className="w-full lg:grid lg:justify-center bg-primary shadow rounded p-4">
                <h2 className="text-xl text-white font-semibold mb-2 lg:text-center">Usuarios últimos 7 días</h2>
                <LineChart stats={stats} />
            </div>
            {/* Acciones rápidas - Based on your Sidebar menus */}
            <div className="bg-primary p-6 rounded-lg shadow">
                <h2 className="text-xl text-white font-semibold mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ActionButton 
                        icon="➕" 
                        label="Crear Usuario" 
                        onClick={() => window.location.href = '/admin/RegisterUser'}
                        color="blue"
                    />
                    <ActionButton 
                        icon="📋" 
                        label="Ver Estudiantes" 
                        onClick={() => window.location.href = '/admin/alumnos'}
                        color="green"
                    />
                    <ActionButton 
                        icon="👨‍🏫" 
                        label="Ver Docentes" 
                        onClick={() => window.location.href = '/admin/docentes'}
                        color="purple"
                    />
                    <ActionButton 
                        icon="🏫" 
                        label="Gestionar Instituciones" 
                        onClick={() => window.location.href = '/admin/registerinstitutions'}
                        color="orange"
                    />
                </div>
            </div>
        </div>
    );
}
export default HomeAdmin;