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
    fotoPerfil?: File | string;
    id: string | undefined;
};

const Profile = () => {
    const navigate = useNavigate();    
    const [ user, setUser ] = useState<User | null>(null);
    const [ roles, setRoles ] = useState<Rol[]>([]);
    const [ editingUser, setEditingUser ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
    const [ , setPreviewUrl ] = useState<string | null>(null);   
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellido: '',
        rol: '',        
        id: ''
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
                    getRoles()
                ]);
                //console.log('Respuesta del servidor:', userData);                               
                setRoles(rolesData);                   
                
                if (userData?.user) {
                    setUser(userData.user);
                    //console.log('Datos de usuario:', userData.user);
                    let rolId = '';
                    if (typeof userData.user.rol === 'string') {
                        rolId = userData.user.rol;
                    } else if (userData.user.rol && '_id' in userData.user.rol) {
                        rolId = userData.user.rol._id;
                    }

                    // Asegurarse de que el Id del usuario este presente
                    const userId = userData.user._id || userData.user.id;
                    if (!userId) {
                        throw new Error('No se encontró el Id del usuario');
                    }

                    setFormData({
                        nombre: userData.user.nombre,
                        apellido: userData.user.apellido,
                        rol: rolId,                        
                        id: userId,
                    });
                    
                    if (userData.user.fotoPerfil?.url) {
                        setPreviewUrl(userData.user.fotoPerfil.url);
                    }
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
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };
            // console.log('Nuevo estado del formulario:', newData);
            return newData;
        });
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
            if(!formData.id) {console.error('ID de usuario no definido');
             return;}
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
        if (user) {
            const rolId = typeof user.rol === 'string' ? user.rol : user.rol._id;
            const userId = user._id;
            // console.log('Rol Id para resetear:', rolId);
             
            setFormData({
                nombre: user.nombre,
                apellido: user.apellido,
                rol: rolId,
                id: userId
            });
            setPreviewUrl(user.fotoPerfil?.url || null);
        }
        setSelectedFile(null);
        setEditingUser(false);        
    };

    const defaultAvatar = 'https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulga-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg';
    const avatarSrc = user?.fotoPerfil?.url 
                      ? `http://localhost:5000${user.fotoPerfil.url}`
                      : defaultAvatar;

    return (
        <section className="bg-primary p-8 rounded-xl text-white">
            <h1 className="text-xl text-white font-bold md:text-2xl">Perfil</h1>
            <hr className="my-8 border-gray-500" />
            <form onSubmit={handleSave}>
                {/* Avatar */}
                <section className="flex items-center">
                    <div className="w-1/4">
                        <p>Avatar</p>
                    </div>                    
                    <div className="flex-1">
                        <div className="relative mb-2">
                            <img 
                                src={avatarSrc} 
                                alt="foto de perfil" 
                                className="w-28 h-28 object-cover rounded-lg"
                                onError={(e) => { e.currentTarget.src = defaultAvatar;}} 
                            />
                            {editingUser && (
                                <div>
                                    <label htmlFor="avatar" className="absolute bg-primary p-2 rounded-full hover:cursor-pointer -top-2 left-24"><RiEdit2Line className='text-secondary-500' /></label>
                                    <input 
                                        type="file" 
                                        name="fotoPerfil" 
                                        id="avatar"
                                        className="hidden" 
                                        // {...register("avatar")} 
                                        accept='image/*' 
                                        onChange={handleFileChange}
                                    />
                                </div>                                    
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
                        <>
                            <button
                                type="button"
                                className={`mt-4 py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'} font-bold text-white rounded 
                                transition-colors`}
                                onClick={ resetForm }
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
                                onClick={() => {setEditingUser(true) } }                           
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