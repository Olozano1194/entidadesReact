//hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Api
import { getUserProfile, updateUser } from "../../../../api/user.api";
import { getRoles } from "../../../../api/roles.api";
//icons
import { RiEdit2Line } from "react-icons/ri";
//models
import type { User } from "../../../../model/user.model";
import type { Rol } from "../../../../model/rol.models";
//Mensajes
import { toast } from "react-hot-toast";

interface FormData {
    nombre: string;
    apellido: string;
    rol: string;
    // avatar: string | File | undefined;
    id: string | undefined;
};

const Profile = () => {
    const navigate = useNavigate();    
    const [, setUser] = useState<User>();
    const [ roles, setRoles ] = useState<Rol[]>([]);
    const [ editingUser, seteditingUser ] = useState(false);
    //const [loading, setLoading] = useState(true);
    //const { handleSubmit, setValue } = useForm();
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellido: '',
        rol: '',
        // avatar: undefined,
        id: ''
    });

    //hook para vizualizar los datos de la bd
    useEffect(() => {
        const fetchData = async () => {
            try {
                //Verificamos si existe un token
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                };
                //obtenemos datos del usuario y rol
                const [userData, rolesData] = await Promise.all([
                    getUserProfile(),
                    getRoles()
                ]);
                //console.log('Respuesta del servidor:', userData);
                               
                setRoles(rolesData);

                // const avatarUrl = userData.user.avatar instanceof File ? URL.createObjectURL(userData.user.avatar) : userData.user.avatar ?? '';               
                
                if (userData && userData.user) {
                    setUser(userData.user);
                    //console.log('Datos de usuario:', userData.user);
                    let rolId = '';
                    if (typeof userData.user.rol === 'string') {
                        rolId = userData.user.rol;
                    } else if (userData.user.rol && '_id' in userData.user.rol) {
                        rolId = userData.user.rol._id;
                    }

                    setFormData({
                        nombre: userData.user.nombre,
                        apellido: userData.user.apellido,
                        rol: rolId,
                        //avatar: avatarUrl,
                        id: userData.user._id,
                    });
                    //setLoading(false);                                
                }else {
                    console.log('Datos de usuario faltantes:', userData);
                    toast.error('Error al obtener datos del usuario');
                }                
            }catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al mostrar el perfil del usuario';
                toast.error(errorMessage, {
                    duration: 3000,
                    position: 'bottom-right',
                });  
            }
        };
        fetchData();
    }, [navigate]);

    //Función donde manejamos los cambios en el formulario
    const handleChanges = (data: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = data.target;
        setFormData((prevData) => ({ 
            ...prevData,
            [name]: value
        }));
    };

    //Función para las imagenes
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFormData(prev => ({
                ...prev,
                avatar: file  // Guardamos el archivo directamente
            }));
        }
    };

    //Función para guardar los cambios en el formulario
    const handleSave = async () => {
        try {
            //const rolesArray = Array.isArray(formData.rol) ? formData.rol : [formData.rol];
            // Enviamos solo los campos necesarios
            const dataToUpdate = {
                nombre: formData.nombre,
                apellido: formData.apellido,
                rol: formData.rol,
                //avatar: formData.avatar instanceof File ? formData.avatar : undefined,
            };

            //console.log('Datos a actualizar', dataToUpdate);
            const updatedProfile = await updateUser(parseInt(formData.id), dataToUpdate);
            
            if (updatedProfile) {
                setUser(updatedProfile);
                seteditingUser(false); // Desactivar modo edición
                // Actualizar el formData con los nuevos datos
                setFormData(prev => ({
                    ...prev,
                    nombre: updatedProfile.nombre,
                    apellido: updatedProfile.apellido,
                    rol: updatedProfile.rol,
                    //avatar: updatedProfile.avatar,
                }));
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el Usuario';
            toast.error(errorMessage, {
                    duration: 3000,
                    position: 'bottom-right',
            });            
        }
    };

    const avatarSrc = formData.avatar 
        ? (formData.avatar instanceof File
            ? URL.createObjectURL(formData.avatar)
            : formData.avatar.startsWith('http') 
                ? formData.avatar
                :  `${import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD}${formData.avatar}`)
        : 'https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulga-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg';

    return (
        <section className="bg-primary p-8 rounded-xl text-white">
            <h1 className="text-xl text-white font-bold md:text-2xl">Perfil</h1>
            <hr className="my-8 border-gray-500" />
            <form>
                {/* Avatar */}
                <section className="flex items-center">
                    <div className="w-1/4">
                        <p>Avatar</p>
                    </div>                    
                    <div className="flex-1">
                        <div className="relative mb-2">
                            <img src={avatarSrc} 
                                alt="Avatar" 
                                className="w-28 h-28 object-cover rounded-lg" 
                            />
                            {editingUser && (
                                <>
                                    <label htmlFor="avatar" className="absolute bg-secondary p-2 rounded-full hover:cursor-pointer -top-2 left-24"><RiEdit2Line className='text-primary' /></label>
                                    <input type="file" name="avatar" id="avatar"        className="hidden" 
                                    // {...register("avatar")} 
                                    accept='image/*' 
                                    onChange={handleFileChange}
                                    />
                                </>
                            )}                            
                        </div>
                        <p className="text-gray-300 text-sm mb-5">Allowed file types: png, jpg, jpeg.</p>
                    </div>                       
                </section>
                {/* Nombre y apellidos */}
                <section className="flex flex-col items-center mb-8 md:flex-row">
                    <div className="mb-4 md:w-1/4 md:mb-0">
                        <p>Nombre Completo <span className="text-red-500">*</span></p>
                    </div>
                    <section className="flex-1 flex items-center gap-4">
                        {/* Nombre */}
                        <div className="w-full">
                            <input 
                                type="text"
                                className="w-full py-2 px-4 outline-none rounded-lg bg-dark text-white"
                                placeholder='Nombre(s)' 
                                id="name"
                                name='nombre'
                                value={formData.nombre}
                                onChange={handleChanges}
                                disabled={!editingUser}
                            />                           
                        </div>
                        {/* Apellido */}
                        <div className="w-full">
                            <input 
                                type="text" 
                                className="w-full py-2 px-4 outline-none rounded-lg bg-dark text-white"
                                placeholder='Apellido(s)'
                                id="lastname"
                                name='apellido'
                                value={formData.apellido}
                                onChange={handleChanges}
                                disabled={!editingUser}                                   
                            />                                   
                        </div>
                    </section>                                      
                </section>
                {/* Rol */}
                <section className="flex flex-col items-center md:flex-row">                    
                    <div className="mb-4 md:w-1/4 md:mb-0">
                        <p>Rol <span className="text-red-500">*</span></p>
                    </div>
                    <div className="w-full flex-1 flex items-center gap-4">
                        <div className="w-full md:w-1/2">
                            <select 
                                name="rol" 
                                value={formData.rol}
                                onChange={handleChanges}
                                disabled={!editingUser} 
                                className="w-full py-2 px-4 outline-none rounded-lg bg-dark text-white appearance-none"                                   
                            >
                                <option value="">Seleccione un rol</option>
                                { roles.map(rol => (                    
                                                            
                                        <option key={rol._id} value={rol._id}>
                                            {rol.nombre}
                                        </option>
                                        )
                                    )
                                }     
                            </select>                                   
                        </div>                                                
                    </div>
                </section>
                {/* Botones de acción */}
                <section className='flex justify-end items-center'>
                    {editingUser ? (
                    <button
                        type="button"
                        className="mt-4 py-2 px-4 bg-orange-700 cursor-pointer font-bold text-white rounded hover:scale-105 hover:bg-orange-500"
                        onClick={handleSave}
                    >
                        Guardar Cambios
                    </button>
                    ) : (
                    <button
                        type="button"
                        className="mt-4 py-2 px-4 bg-sky-700 cursor-pointer font-bold text-white rounded hover:scale-105 hover:bg-sky-500"
                        onClick={() => seteditingUser(true)}
                    >
                        Editar Perfil
                    </button>
                    )}          
                </section>                                
            </form>
        </section>
    );
};
export default Profile;