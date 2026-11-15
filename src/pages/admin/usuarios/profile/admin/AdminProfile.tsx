//hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Api
import { getUserProfile, updateUser } from "../../../../../api/user.api";
import { getAdminById, updateAdmin } from "../../../../../api/admin.api";
import { getRoles } from "../../../../../api/roles.api";
//icons
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
//components
import ProfileAvatar from "../ProfileAvatar";
//models
import type { User } from "../../../../../types/user.model";
import type { AdminModel } from "../../../../../types/admin.model";
import type { Rol } from "../../../../../types/rol.models";
// Dto
import type { UpdateAdminDto } from "../../../../../types/dto/admin.dto";
//Mensajes
import { toast } from "react-hot-toast";


interface FormData {
    rol: string;
    fotoPerfil?: File | string;
    id: string | undefined;
    nombre: string;
    apellido: string;
    telefono: string;
    cargo: string;
};

const AdminProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<Rol[]>([]);
    const [admin, setAdmin] = useState<AdminModel | null>(null);
    const [editingUser, setEditingUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellido: '',
        rol: '',
        id: '',
        telefono: '',
        cargo: '',

    });

    //hook para vizualizar los datos de la bd
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                //Verificamos si existe un token
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                };
                //obtenemos datos del usuario y rol
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
                    toast.error(errorMessage, {
                        duration: 3000,
                        position: 'bottom-right',
                    });
                }
                // console.log('Datos de usuario:', studentData.student);
                let rolId = '';
                const rolField = userData?.user?.rol;
                if (rolField) {
                    if (typeof rolField === 'string') rolId = rolField;
                    else if (typeof rolField === 'object') rolId = rolField._id;
                }
                // Asegurarse de que el Id del usuario este presente
                const userId = userData.user._id || userData.user.id;

                if (!userId) {
                    throw new Error('No se encontró el Id del usuario');
                }

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
                toast.error(errorMessage, {
                    duration: 3000,
                    position: 'bottom-right',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    //Función donde manejamos los cambios en el formulario
    const handleChanges = (data: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = data.target;
        // console.log('Cambio en campo:', name, value);       

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
            // console.log('Nuevo estado del formulario:', newData);            
        }));
    };

    //Función para las imagenes
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            // Validamos tamaño del archivo
            if (file.size > 3 * 1024 * 1024) {
                toast.error('El archivo seleccionado es demasiado grande.');
                return;
            }
            // Validar formato de archivo
            const validTypes = ['image/jpeg', 'image/png, image/jpg'];
            if (!validTypes.includes(file.type)) {
                toast.error('Solo se permiten archivos de tipo imagen (jpg, jpeg, png).');
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    //Función para guardar los cambios en el formulario
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('Iniciando guardado....', formData );        

        // setIsSubmitting(true);
        try {
            if (!formData.id) { console.error('ID de usuario no definido'); return; }
            setLoading(true);

            const data = new FormData();
            data.append('nombre', formData.nombre);
            data.append('apellido', formData.apellido);
            data.append('rol', formData.rol);

            if (selectedFile) {
                data.append('fotoPerfil', selectedFile, selectedFile.name);
            }

            // console.log('Datos a enviar:', {
            //     nombre: formData.nombre,
            //     apellido: formData.apellido,
            //     rol: formData.rol,
            //     tieneImagen: !!selectedFile
            // });
            const updatedUser = await updateUser(formData.id, data);
            // console.log('Respuesta del servidor:', updatedUser);

            if (admin) {
                const teacherUpdates: Partial<UpdateAdminDto> = {
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    telefono: formData.telefono,
                    cargo: formData.cargo
                };
                const updatedStudent = await updateAdmin(admin._id!, teacherUpdates);
                setAdmin(updatedStudent);
            }

            setUser(updatedUser);
            setSelectedFile(null);
            setEditingUser(false);

            // Actualizar preview URL con la nueva img
            if (updatedUser.fotoPerfil?.url) {
                setPreviewUrl(updatedUser.fotoPerfil.url.includes('http')
                    ? updatedUser.fotoPerfil.url
                    : `http://localhost:5000${updatedUser.fotoPerfil.url}`
                );
            }
            toast.success('Usuario actualizado con éxito');
            //console.log('Datos a actualizar', dataToUpdate);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el Usuario';
            toast.error(errorMessage, {
                duration: 3000,
                position: 'bottom-right',
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        // console.log('Reseteando form...');        
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

    return (
        <section className="w-full">
            {/* Header profile */}
            <div className="flex flex-col gap-8 items-center mb-section-gap md:flex-row">
                <ProfileAvatar
                    avatarSrc={avatarSrc}
                    defaultAvatar={defaultAvatar}
                    isEditing={editingUser}
                    onFileChange={handleFileChange}
                />
                {/* Full Name Profile */}
                <div className="text-center md:text-left">
                    <h1 className="font-headline-lg mb-2 text-headline-lg text-on-surface">
                        {formData?.nombre} {formData?.apellido}
                    </h1>
                    <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                        <span className="bg-primary-container font-label-bold px-3 py-1 rounded-full text-on-primary-container text-label-bold">Super Administrador</span>
                        <span className="bg-secondary-container font-label-bold px-3 py-1 rounded-full text-on-secondary-container text-label-bold">Responsable Académico</span>
                        <span className="flex font-medium gap-1 items-center text-on-surface-variant text-sm">
                            <IoLocationOutline />
                            Campus Principal, Green Valey
                        </span>
                    </div>
                </div>
                {/* button */}
                <div className="flex gap-3 md:ml-auto">
                    <button className="border-2 border-primary cursor-pointer flex font-label-bold gap-2 items-center px-6 py-2.5 rounded-xl text-primary text-label-bold transition-all hover:bg-emerald-50 active:scale-95">
                        Cancelar
                    </button>
                    <button className="bg-primary cursor-pointer flex font-label-bold gap-2 items-center px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-900/10 text-white text-label-bold transition-all hover:bg-emerald-800 active:scale-95">
                        Guardar cambios
                    </button>
                </div>
            </div>
            {/* Dashboard Grid */}
            <section className="border border-emerald-50 bg-white p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] w-full">
                {/* Title */}
                <div className="flex items-center justify-between mb-8">
                    <h3 className="flex font-headline-md font-semibold gap-3 items-center text-headline-md text-primary md:text-2xl">
                        <IoPersonOutline className="text-primary" />
                        Información del perfil
                    </h3>
                </div>
                {/* Formulario del perfil */}
                <form onSubmit={handleSave} className="grid grid-cols-1 gap-form-stack md:grid-cols-2">
                    {/* Nombre y apellidos */}
                    <section className="flex flex-col gap-2">
                        <label className="font-label-bold text-label-bold text-on-surface-variant">
                            Nombre Completo <span className="text-red-500">*</span>
                        </label>
                        <section className="flex-1 flex items-center gap-4">
                            {/* Nombre */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="border border-outline-variant bg-surface-container-lowest font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary"
                                    placeholder='Nombre(s)'
                                    id="name"
                                    name='nombre'
                                    value={formData.nombre ?? ''}
                                    onChange={handleChanges}
                                    disabled={!editingUser}
                                />
                            </div>
                            {/* Apellido */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="border border-outline-variant bg-surface-container-lowest font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary"
                                    placeholder='Apellido(s)'
                                    id="lastname"
                                    name='apellido'
                                    value={formData.apellido ?? ''}
                                    onChange={handleChanges}
                                    disabled={!editingUser}
                                />
                            </div>
                        </section>
                    </section>
                    {/* Telefono */}
                    <section className="flex flex-col gap-2">
                        <label className="font-label-bold text-label-bold text-on-surface-variant">
                            <p>Teléfono <span className="text-red-500">*</span></p>
                        </label>
                        <input
                            type="tel"
                            className="border border-outline-variant bg-surface-container-lowest font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary"
                            id="phone"
                            name='telefono'
                            placeholder="3003213215"
                            value={formData.telefono ?? ''}
                            onChange={handleChanges}
                            disabled={!editingUser}
                        />


                    </section>
                    {/* Rol */}
                    <section className="flex flex-col gap-2">
                        <label className="font-label-bold text-label-bold text-on-surface-variant">
                            <p>Rol <span className="text-red-500">*</span></p>
                        </label>
                        <select
                            name="rol"
                            value={formData.rol ?? ''}
                            onChange={handleChanges}
                            disabled={!editingUser}
                            className="appearance-none border border-outline-variant bg-surface-container-lowest cursor-pointer font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary"
                        >
                            <option value="">Seleccione un rol</option>
                            {roles.map(rol => (
                                <option key={rol._id} value={rol._id}>
                                    {rol.nombre}
                                </option>
                            )
                            )
                            }
                        </select>


                    </section>
                    {/* Cargo */}
                    <section className="flex flex-col gap-2">
                        <label className="font-label-bold text-label-bold text-on-surface-variant">
                            <p>Cargo <span className="text-red-500">*</span></p>
                        </label>
                        <input
                            type="text"
                            className="border border-outline-variant bg-surface-container-lowest font-body-md py-3 px-4 outline-none rounded-lg text-body-md text-primary transition-all w-full focus:border-primary focus:right-1 focus:ring-primary"
                            id="address"
                            name='cargo'
                            placeholder="Ing de Sistemas"
                            value={formData.cargo ?? ''}
                            onChange={handleChanges}
                            disabled={!editingUser}
                        />

                    </section>
                    <section className="flex flex-col gap-2 pt-4 md:col-span-2">
                        <label className="font-label-bold text-label-bold text-on-surface-variant">
                            Breve biografía
                        </label>
                        <textarea name="bio" id="bio" className="border border-outline-variant bg-surface-container-lowest font-body-md px-4 py-3 rounded-lg transition-all text-body-m w-full focus:border-primary focus:ring-1 focus:ring-primary" rows={3} defaultValue="Supervisión de protocolos administrativos a nivel institucional e iniciativas de transformación digitales desde 2018.">
                        </textarea>
                    </section>
                    {/* Botones de acción */}
                    <section className='flex justify-end items-center'>
                        {editingUser ? (
                            <>
                                <button
                                    type="button"
                                    className={`mt-4 py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'} font-bold text-white rounded 
                                transition-colors`}
                                    onClick={resetForm}
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={`mt-4 py-2 px-4 ${loading ? 'bg-orange-400' : 'bg-orange-700 hover:bg-orange-600'} font-bold text-white rounded transition-colors`}
                                    disabled={loading}
                                >
                                    {loading ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="mt-4 py-2 px-4 bg-sky-700 cursor-pointer font-bold text-white rounded hover:scale-105 hover:bg-sky-500"
                                onClick={() => { setEditingUser(true) }}
                            >
                                Editar Perfil
                            </button>
                        )}

                    </section>
                </form>
            </section>
        </section>
    );
};
export default AdminProfile;