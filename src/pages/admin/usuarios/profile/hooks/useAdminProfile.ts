import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUserProfile, updateUser } from "../../../../../api/user.api";
import { getAdminById, updateAdmin } from "../../../../../api/admin.api";
import { getRoles } from "../../../../../api/roles.api";
import type { User } from "../../../../../types/user.model";
import type { AdminModel } from "../../../../../types/admin.model";
import type { Rol } from "../../../../../types/rol.models";
import type { UpdateAdminDto } from "../../../../../types/dto/admin.dto";

export interface AdminFormData {
    rol: string;
    fotoPerfil?: File | string;
    id: string | undefined;
    nombre: string;
    apellido: string;
    telefono: string;
    cargo: string;
    biografia: string;
}

const DEFAULT_AVATAR =
    'https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulga-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg';

const resolveAvatarUrl = (url?: string): string => {
    if (!url) return '';
    return url.startsWith('http') ? url : `http://localhost:5000${url}`;
};

const resolveRolId = (rolField: User['rol'] | undefined, rolesData: Rol[]): string => {
    if (!rolField) return '';
    if (typeof rolField === 'string') {
        const found = rolesData.find(
            (r) => r._id === rolField || r.nombre?.toLowerCase() === rolField.toLowerCase()
        );
        return found ? found._id : rolField;
    }
    if (typeof rolField === 'object') {
        return (rolField as { _id?: string })._id || '';
    }
    return '';
};

export const useAdminProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<Rol[]>([]);
    const [admin, setAdmin] = useState<AdminModel | null>(null);
    const [editingUser, setEditingUser] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState<AdminFormData>({
        nombre: '',
        apellido: '',
        rol: '',
        id: '',
        telefono: '',
        cargo: '',
        biografia: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                if (!token) { navigate('/'); return; }
                const [userData, rolesData] = await Promise.all([
                    getUserProfile(),
                    getRoles(),
                ]);
                setRoles(rolesData);
                setUser(userData.user);

                let adminData: AdminModel | null = null;
                try {
                    const response = await getAdminById();
                    adminData = response?.admin ?? null;
                    setAdmin(adminData);
                } catch (error) {
                    console.warn('No se encontró perfil de admin, usando datos del usuario', error);
                }

                const rolId = resolveRolId(userData?.user?.rol, rolesData);
                const userId = userData.user._id || userData.user.id;
                if (!userId) throw new Error('No se encontró el Id del usuario');

                setFormData({
                    nombre: adminData?.nombre || userData.user?.nombre || '',
                    apellido: adminData?.apellido || userData.user?.apellido || '',
                    rol: rolId,
                    id: userId,
                    telefono: adminData?.telefono || userData.user?.telefono || '',
                    cargo: adminData?.cargo || userData.user?.cargo || '',
                    biografia: adminData?.biografia || userData.user?.biografia || '',
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al mostrar el perfil del administrador';
                toast.error(errorMessage, { duration: 3000, position: 'bottom-right' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    // Solo el superAdmin puede modificar el rol
    const currentRoleName = typeof user?.rol === 'string'
        ? user.rol
        : user?.rol?.nombre ?? '';
    const isSuperAdmin = currentRoleName.toLowerCase().replace(/[\s_-]/g, '') === 'superadmin';

    const handleChanges = (
        data: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = data.target;
        if (name === 'rol' && !isSuperAdmin) return;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            if (file.size > 3 * 1024 * 1024) { toast.error('El archivo seleccionado es demasiado grande.'); return; }
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) { toast.error('Solo se permiten archivos de tipo imagen (jpg, jpeg, png).'); return; }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const userId = formData.id || user?._id || user?.id;
        if (!userId) {
            toast.error('No se pudo identificar el usuario');
            return;
        }
        setLoading(true);
        try {
            let updatedUser = user;
            if (selectedFile) {
                const data = new FormData();
                data.append('fotoPerfil', selectedFile, selectedFile.name);
                updatedUser = await updateUser(userId, data);
            }
            if (admin?._id) {
                const adminUpdates: Partial<UpdateAdminDto> = {
                    nombre: formData.nombre.trim(),
                    apellido: formData.apellido.trim(),
                    telefono: formData.telefono.trim(),
                    cargo: formData.cargo.trim(),
                    biografia: formData.biografia.trim(),
                };
                const updatedAdmin = await updateAdmin(admin._id, adminUpdates);
                setAdmin(updatedAdmin);
            }
            if (updatedUser) {
                setUser(updatedUser);
            }
            setSelectedFile(null);
            setPreviewUrl(null);
            setEditingUser(false);
            toast.success('Usuario actualizado con éxito');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el Usuario';
            toast.error(errorMessage, { duration: 3000, position: 'bottom-right' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        if (user || admin) {
            const rolId = resolveRolId(user?.rol, roles);
            setFormData({
                nombre: admin?.nombre || user?.nombre || '',
                apellido: admin?.apellido || user?.apellido || '',
                rol: rolId,
                id: user?._id || user?.id || '',
                telefono: admin?.telefono || user?.telefono || '',
                cargo: admin?.cargo || user?.cargo || '',
                biografia: admin?.biografia || user?.biografia || '',
            });
            setSelectedFile(null);
            setPreviewUrl(null);
            setEditingUser(false);
        }
    };

    const avatarSrc = previewUrl || resolveAvatarUrl(user?.fotoPerfil?.url) || DEFAULT_AVATAR;

    return {
        user, roles, admin, editingUser, setEditingUser, selectedFile, previewUrl,
        formData, loading, isSuperAdmin, handleChanges, handleFileChange, handleSave, resetForm,
        defaultAvatar: DEFAULT_AVATAR, avatarSrc,
    };
};
