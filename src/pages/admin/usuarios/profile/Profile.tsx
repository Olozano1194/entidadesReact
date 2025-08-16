import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentProfile from "./student/StudentProfile";
import TeacherProfile from "./teacher/TeacherProfile";
import AdminProfile from "./admin/AdminProfile";

const Profile = () => {
    const navigate = useNavigate();
    const [ userRole, setUserRole ] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            if (!token) {
                navigate('/');
                return;
            }

            if (!user?.rol) {
                console.error('Datos de usuario incompletos en localStorage');
                navigate('/');
                return;                
            }
            
            setUserRole(user.rol.nombre || user.rol);
            setLoading(false);
        };
        checkAuth();
    }, [navigate]);

    

    if (loading) return <div>Cargando Perfil...</div>;

    return (
        <main>  {userRole === 'estudiante' && <StudentProfile />} 
                {userRole === 'docente' && <TeacherProfile />} 
                {userRole === 'admin' && <AdminProfile />} 
        </main>
    );
  
};
export default Profile;         