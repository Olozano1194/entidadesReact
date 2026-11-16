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
}

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

                let adminData = null;
                try {
                    const response = await getAdminById();
                    adminData = response?.admin ?? null;
                    setAdmin(adminData);
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el administrador';
                    toast.error(errorMessage, { duration: 3000, position: 'bottom-right' });
                }

                let rolId = '';
                const rolField = userData?.user?.rol;
                if (rolField) {
                    if (typeof rolField === 'string') rolId = rolField;
                    else if (typeof rolField === 'object') rolId = rolField._id;
                }
                const userId = userData.user._id || userData.user.id;
                if (!userId) throw new Error('No se encontró el Id del usuario');

                setFormData({
                    nombre: adminData?.nombre || '',
                    apellido: adminData?.apellido || '',
                    rol: rolId,
                    id: userId,
                    telefono: adminData?.telefono || '',
                    cargo: adminData?.cargo || '',
                });

                if (userData.user.fotoPerfil?.url) {
                    setPreviewUrl(userData.user.fotoPerfil.url);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al mostrar el perfil del administrador';
                toast.error(errorMessage, { duration: 3000, position: 'bottom-right' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const handleChanges = (data: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = data.target;
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
        if (!formData.id) { console.error('ID de usuario no definido'); return; }
        setLoading(true);
        try {
            const data = new FormData();
            data.append('nombre', formData.nombre);
            data.append('apellido', formData.apellido);
            data.append('rol', formData.rol);
            if (selectedFile) data.append('fotoPerfil', selectedFile, selectedFile.name);

            const updatedUser = await updateUser(formData.id, data);
            if (admin) {
                const adminUpdates: Partial<UpdateAdminDto> = {
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    telefono: formData.telefono,
                    cargo: formData.cargo
                };
                const updatedAdmin = await updateAdmin(admin._id!, adminUpdates);
                setAdmin(updatedAdmin);
            }
            setUser(updatedUser);
            setSelectedFile(null);
            setEditingUser(false);
            if (updatedUser.fotoPerfil?.url) {
                setPreviewUrl(updatedUser.fotoPerfil.url.includes('http') ? updatedUser.fotoPerfil.url : `http://localhost:5000${updatedUser.fotoPerfil.url}`);
            }
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
            const rolId = typeof user?.rol === 'string' ? user.rol : user?.rol._id ?? '';
            setFormData({
                nombre: admin?.nombre ?? '',
                apellido: admin?.apellido ?? '',
                rol: rolId,
                id: user?._id ?? '',
                telefono: admin?.telefono ?? '',
                cargo: admin?.cargo ?? ''
            });
            setSelectedFile(null);
            setEditingUser(false);
        }
    };

    const defaultAvatar = 'https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulga-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg';
    const avatarSrc = user?.fotoPerfil?.url
        ? `http://localhost:5000${user.fotoPerfil.url}`
        : defaultAvatar;

    return {
        user, roles, admin, editingUser, setEditingUser, selectedFile, previewUrl,
        formData, loading, handleChanges, handleFileChange, handleSave, resetForm,
        defaultAvatar, avatarSrc,
    };
};