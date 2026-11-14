import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getUsers } from '../../../api/user.api';
import { getStudent } from '../../../api/student.api';
import { getTeacher } from '../../../api/teacher.api';
import { getInstitutions } from '../../../api/institution.api';
import type { Student } from '../../../types/student.model';
import HomeCard from './HomeCard';
import ActionButton from './ActionButton';
import LineChart from './LineChart';
// icons
import { MdOutlineCalendarToday, MdOutlineFileDownload, MdOutlineSchool, MdOutlineAccountBalance } from "react-icons/md";
import { IoPersonOutline, IoPersonAddOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiSolidInstitution } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";

const HomeAdmin = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalInstitutions: 0,
        recentStudents: [] as Student[],
    });
    const [loading, setLoading] = useState(true);

    const toArray = (res: unknown): unknown[] => {
        if (Array.isArray(res)) return res;
        if (res && typeof res === 'object') {
            const r = res as Record<string, unknown>;
            if (Array.isArray(r.data)) return r.data;
            if (Array.isArray(r.users)) return r.users;
            if (Array.isArray(r.students)) return r.students;
            if (Array.isArray(r.teachers)) return r.teachers;
            if (Array.isArray(r.institutions)) return r.institutions;
        }
        return [];
    };

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [ usersRes, studentsRes, teachersRes, institutionsRes ] = await Promise.all([
                    getUsers(),
                    getStudent(),
                    getTeacher(),
                    getInstitutions()
                ]);
                console.log("HomeAdmin responses:", { usersRes, studentsRes, teachersRes, institutionsRes });
                const students = toArray(studentsRes) as Student[];
                setStats({
                    totalUsers: toArray(usersRes).length,
                    totalStudents: students.length,
                    totalTeachers: toArray(teachersRes).length,
                    totalInstitutions: toArray(institutionsRes).length,
                    recentStudents: students.slice(-5).reverse(),
                });
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeData();
    }, []);

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
                {(() => {
                    const pct = (n: number) => stats.totalUsers > 0 ? Math.round((n / stats.totalUsers) * 100) : 0;
                    return (
                        <>
                <HomeCard 
                    title="Total Usuarios" 
                    value={stats.totalUsers} 
                    icon={<IoPersonOutline />} 
                    iconColor="text-blue-600"
                    iconBg="bg-blue-50"
                    trend={stats.totalUsers > 0 ? "100%" : "0%"}
                    trendType={stats.totalUsers > 0 ? "up" : "neutral"}
                />
                <HomeCard 
                    title="Estudiantes Activos" 
                    value={stats.totalStudents} 
                    icon={<MdOutlineSchool />} 
                    iconColor="text-green-600"
                    iconBg="bg-green-50"
                    trend={`${pct(stats.totalStudents)}%`}
                    trendType="up"
                />
                <HomeCard 
                    title="Profesores Certificados" 
                    value={stats.totalTeachers} 
                    icon={<PiStudent />}
                    iconColor="text-red-600"
                    iconBg="bg-red-50"
                    trend={`${pct(stats.totalTeachers)}%`}
                    trendType="up"
                />
                <HomeCard 
                    title="Instituciones Asociadas" 
                    value={stats.totalInstitutions} 
                    icon={<MdOutlineAccountBalance />}
                    iconColor="text-orange-600"
                    iconBg="bg-orange-50"
                    trend={`${pct(stats.totalInstitutions)}%`}
                    trendType="neutral"                    
                />
                        </>
                    );
                })()}
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
                            {stats.recentStudents.slice(0, 4).map((student) => (
                                <div
                                    key={student._id ?? student.nombre}
                                    title={`${student.nombre} ${student.apellido}`}
                                    className='border-2 border-white bg-emerald-100 flex font-bold h-8 items-center justify-center rounded-full text-[10px] text-emerald-700 w-8'
                                >
                                    {student.nombre.charAt(0).toUpperCase()}
                                    {student.apellido.charAt(0).toUpperCase()}
                                </div>
                            ))}
                            {stats.recentStudents.length > 4 && (
                                <div className='border-2 border-white bg-slate-200 flex font-bold h-8 items-center justify-center rounded-full text-[10px] text-slate-600 w-8'>
                                    +{stats.recentStudents.length - 4}
                                </div>
                            )}
                        </picture>
                        <span className='font-medium text-slate-600 text-sm'>Estudiantes recientemente registrados</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => toast('Análisis completo próximamente', { icon: '📊', duration: 3000, position: 'bottom-right' })}
                        className='font-bold text-sm text-emerald-700 cursor-pointer hover:underline'
                    >
                        Ver todos los análisis
                    </button>
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
                        icon={<PiStudent />} 
                        label="Ver Estudiantes"
                        description="Inscribir al estudiante en instituciones" 
                        onClick={() => window.location.href = '/admin/alumnos'}
                        color="green"
                    />
                    <ActionButton 
                        icon={<GiTeacher />} 
                        label="Ver Docentes"
                        description="Inscribir al estudiante en instituciones" 
                        onClick={() => window.location.href = '/admin/docentes'}
                        color="purple"
                    />
                    <ActionButton 
                        icon={<BiSolidInstitution />} 
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