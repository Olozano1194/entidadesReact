import { useState, useEffect } from 'react';
import { getUsers } from '../../../api/user.api';
import { getStudent } from '../../../api/student.api';
import { getTeacher } from '../../../api/teacher.api';
import { getInstitutions } from '../../../api/institution.api';
import HomeCard from './HomeCard';
import ActionButton from './ActionButton';
import LineChart from './LineChart';
// icons
import { MdOutlineCalendarToday, MdOutlineFileDownload, MdOutlineSchool, MdOutlineAccountBalance } from "react-icons/md";
import { IoPersonOutline, IoPersonAddOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";

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
        <div className="flex-1 max-w-[1440px] mx-auto p-8 space-y-section-gap w-full">
            {/* Header de bienvenida */}
            <section className="flex flex-col gap-4 justify-between md:flex-row md:items-end">
                <div>
                    <h2 className="text-2xl font-display-xl text-display-xl text-on-surface">Panel de Administración</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">Bienvenido de nuevo. Esto es lo que está sucediendo en sus instituciones hoy en día.</p>
                </div>
                <div className='flex gap-3'>
                    <button className='border border-outline-variant cursor-pointer font-label-bold flex gap-2 items-center px-4 py-2 rounded-xl text-sm transition-colors hover:bg-surface-container'>
                        <span className='text-lg'>
                            <MdOutlineCalendarToday />
                        </span>
                        Ultimos 30 días
                    </button>
                    <button className='bg-primary cursor-pointer font-label-bold flex gap-2 items-center px-4 py-2 rounded-xl shadow-primary/10 shadow-lg text-sm text-white transition-opacity hover:opacity-90'>
                        <span className='text-lg'>
                            <MdOutlineFileDownload />                            
                        </span>
                        Descargar Reporte
                    </button>
                </div>  
            </section>
            {/* Métricas principales */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <HomeCard 
                    title="Total Usuarios" 
                    value={stats.totalUsers} 
                    icon={<IoPersonOutline />} 
                    iconColor="text-blue-600"
                    iconBg="bg-blue-50"
                    trend="12%"
                    trendType="up"
                />
                <HomeCard 
                    title="Estudiantes Activos" 
                    value={stats.totalStudents} 
                    icon={<MdOutlineSchool />} 
                    iconColor="text-green-600"
                    iconBg="bg-green-50"
                    trend="8%"
                    trendType="up"
                />
                <HomeCard 
                    title="Profesores Certificados" 
                    value={stats.totalTeachers} 
                    icon={<PiStudent />}
                    iconColor="text-red-600"
                    iconBg="bg-red-50"
                    trend="5%"
                    trendType="down"
                />
                <HomeCard 
                    title="Instituciones Asociadas" 
                    value={stats.totalInstitutions} 
                    icon={<MdOutlineAccountBalance />}
                    iconColor="text-orange-600"
                    iconBg="bg-orange-50"
                    trend="0%"
                    trendType="neutral"                    
                />
            </div>
            {/* Gráfico rápido */}
            <section className="bg-surface-container-lowest border border-outline-variant/30 p-8 rounded-2xl shadow-sm lg:col-span-2">
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h4 className="font-body-md text-headline-md text-on-surface font-semibold mb-2 lg:text-center lg:col-span-2">Crecimiento de la adquisición de usuarios</h4>
                        <p className='font-body-md text-sm text-on-surface-variant'>Volumen de registro diario en todas las regiones</p>
                    </div>
                    <div className='flex gap-2'>
                        <span className='bg-emerald-50 font-bold gap-1 inline-flex items-center px-3 py-1 rounded-full text-xs text-emerald-600'>
                            <span className='bg-emerald-600 h-2 rounded-full w-2'></span>
                            Nuevos Estudiantes
                        </span>
                    </div>                    
                </div>                
                <LineChart stats={stats} />
                <section className='flex items-center justify-between mt-6'>
                    <div className='flex gap-4 items-center'>
                        <picture className='flex -space-x-3'>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8gKqD_yY4fIUU0yEWjuLTLCQeD7Q_U3187xEtl8LY4g5rrgyrfnJ6FFZ6jVqZ3xaHVJPSn0_c3PtjYif8v7KWhW9cxv3ycv8hsrSuUIOqGD3a6pvv2YetEzh6oy1v1lx9R8KSx5c5LRzDlgZ2O_mHtIAzaDWk14rguudLogpuNWuMuhbJtZ5IlwkoCw2CmYO2Bv7ikSPg4fbs-PSQEIAlpU8UfrWTKp7cOpyxfNFCN5uU1dZUPAWRa2dvPD7m8M9VWbYvo7AgU9n7" alt="" className='border-2 border-white h-8 object-cover rounded-full w-8' />
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjDTbxZQY-4prwiucR2mC_N2sov-AY5sEeXPeDhQn9AFx6dB80JApFElWexxZq0ymcAUypigHx74SGIl5e2pUPb0GwUOr2ish5gR-m1EX4EyaZ6edWhvaLKPt5xr7tDu3yPwfbpRXsAtX8suTSrr0apoElIvGBV5fGJ-Vi3sM65JoBbuDCshZIP26vxhC9DmqJrfQTFTnQMHhiwZhuUTKq0ySkeacv_hyvChPwLB1n2JYgaHIn0SYKcF7A0Aceft-vlgbf0N_Zv8V_" alt="" className='border-2 border-white h-8 object-cover rounded-full w-8' />
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8gKqD_yY4fIUU0yEWjuLTLCQeD7Q_U3187xEtl8LY4g5rrgyrfnJ6FFZ6jVqZ3xaHVJPSn0_c3PtjYif8v7KWhW9cxv3ycv8hsrSuUIOqGD3a6pvv2YetEzh6oy1v1lx9R8KSx5c5LRzDlgZ2O_mHtIAzaDWk14rguudLogpuNWuMuhbJtZ5IlwkoCw2CmYO2Bv7ikSPg4fbs-PSQEIAlpU8UfrWTKp7cOpyxfNFCN5uU1dZUPAWRa2dvPD7m8M9VWbYvo7AgU9n7" alt="" className='border-2 border-white h-8 object-cover rounded-full w-8' />
                            <div className='border-2 border-white bg-slate-200 flex font-bold h-8 items-center justify-center rounded-full text-[10px] text-slate-600 w-8'>+42</div>
                        </picture>
                        <span className='font-medium text-slate-600 text-sm'>Estudiantes recientemente registrados</span>
                    </div>
                    <a href="" className='font-bold text-sm text-emerald-700'>Ver todas los análisis</a>
                </section>
            </section>
            {/* Acciones rápidas - Based on your Sidebar menus */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-8 rounded-2xl shadow-sm">
                <h4 className=" font-headline-md mb-2 text-headline-md text-on-surface">Acciones Rápidas</h4>
                <p className='font-body-md mb-6 text-sm text-on-surface-variant'>Tareas administrativas de uso frecuente</p>
                <div className="space-y-3">
                    <ActionButton 
                        icon={<IoPersonAddOutline />} 
                        label="Crear Usuario"
                        description="Inscribir al estudiante en instituciones" 
                        onClick={() => window.location.href = '/admin/RegisterUser'}
                        color="blue"
                    />
                    <ActionButton 
                        icon="📋" 
                        label="Ver Estudiantes"
                        description="Inscribir al estudiante en instituciones" 
                        onClick={() => window.location.href = '/admin/alumnos'}
                        color="green"
                    />
                    <ActionButton 
                        icon="👨‍🏫" 
                        label="Ver Docentes"
                        description="Inscribir al estudiante en instituciones" 
                        onClick={() => window.location.href = '/admin/docentes'}
                        color="purple"
                    />
                    <ActionButton 
                        icon="🏫" 
                        label="Gestionar Instituciones"
                        description="Configurar nodos organizacionales" 
                        onClick={() => window.location.href = '/admin/registerinstitutions'}
                        color="orange"
                    />
                </div>
                <div className='bg-emerald-950 flex items-center justify-between mt-8 p-4'>
                    <div>
                        <p className='font-bold text-sm text-white'>Salud del sistema</p>
                        <p className='text-xs text-emerald-400'>Todos los módulos operativos</p>
                    </div>
                    <span className='animate-pulse text-emerald-400'>
                        <FaRegCheckCircle />
                    </span>
                </div>
            </div>
        </div>
    );
}
export default HomeAdmin;