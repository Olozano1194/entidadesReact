import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAdminProfile } from "./hooks/useAdminProfile";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import UserPass from "./UserPass";
import AccountStatus from "./AccountStatus";
import StudentProfile from "./student/StudentProfile";
import TeacherProfile from "./teacher/TeacherProfile";

const Profile = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (!token) { navigate('/'); return; }
            if (!user?.rol) { console.error('Datos de usuario incompletos'); navigate('/'); return; }
            const role = user.rol.nombre || user.rol;
            setUserRole(role);
        };
        checkAuth();
    }, [navigate]);

    const admin = useAdminProfile();

    if (userRole === null) return <div>Cargando Perfil...</div>;
    if (userRole === 'admin' && admin.loading) return <div>Cargando Perfil...</div>;

    return (
        <main className="max-w-[1440px] mx-auto w-full md:p-container-padding">
            {userRole === 'estudiante' && <StudentProfile />}
            {userRole === 'docente' && <TeacherProfile />}
            {userRole === 'admin' && (
                <>
                    <ProfileHeader
                        formData={admin.formData}
                        avatarSrc={admin.avatarSrc}
                        defaultAvatar={admin.defaultAvatar}
                        editingUser={admin.editingUser}
                        onFileChange={admin.handleFileChange}
                        onReset={admin.resetForm}
                        onSave={admin.handleSave}
                        onEdit={() => admin.setEditingUser(true)}
                    />
                    <section className="gap-gutter grid grid-cols-1 lg:grid-cols-12">
                        <section className="lg:col-span-8">
                            <ProfileForm
                                formData={admin.formData}
                                roles={admin.roles}
                                editingUser={admin.editingUser}
                                onChange={admin.handleChanges}
                            />
                        </section>
                        <section className="lg:col-span-4">
                            <UserPass />
                        </section>
                    </section>
                    <AccountStatus />
                </>
            )}
        </main>
    );
};
export default Profile;