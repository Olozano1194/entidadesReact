import { useEffect, useState } from "react";
// icons
import { RiArrowDownSLine, RiSettings3Line, RiLogoutCircleRLine } from "react-icons/ri";
//Enlaces
import { Link, useNavigate } from "react-router-dom";
//react-menu
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
//API
import { getUserProfile } from '../../api/user.api';
import { getRoleById } from "../../api/roles.api";
import { getStudentById } from "../../api/student.api";
//Mensajes
import { toast } from 'react-hot-toast';
//Component
import NotificationMenu from "../../components/headerNav/NotificationMenu";
// Model
import type { Rol } from "../../model/rol.models";
import type { Student } from "../../model/student.model";


function NavHeader() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', fotoPerfil: ''});
    const [userRole, setUserRole] = useState<string>('');
    const [ student, setStudent ] = useState< Student | null>(null);
    const [ , setLoggedOut] = useState<boolean>(false);    

    useEffect(() => {
        const axiosUserData = async () => {
            try {
                //Verificamos si existe un token
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                };
                const [ userData, studentData ] = await Promise.all([ getUserProfile(), getStudentById() ]);
                //console.log('User data received:', data);
                if (studentData.student) setStudent(studentData.student);                
                
                //Si el rol viene como objeto
                if (userData.user.rol && typeof userData.user.rol === 'object' && 'nombre' in userData.user.rol) {
                    setUserRole((userData.user.rol as Rol).nombre);
                }
                //Si el rol viene como String
                else if (typeof userData.user.rol === 'string') {
                        const rol = await getRoleById(userData.user.rol);
                        setUserRole(rol.nombre);
                }

                let avatarUrl = '';
                if (userData.user.fotoPerfil instanceof File) {
                    avatarUrl = URL.createObjectURL(userData.user.fotoPerfil);
                } else if (userData.user.fotoPerfil?.url) {
                    const url = userData.user.fotoPerfil.url;
                    avatarUrl = url.startsWith('/')
                    ? `http://localhost:5000${userData.user.fotoPerfil.url}`
                    : url;
                }
                
                setUser({                    
                    email: userData.user.email,                    
                    fotoPerfil: avatarUrl
                });
            }catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al registrar el miembro';
                toast.error(errorMessage, {
                    duration: 3000,
                    position: 'bottom-right',
                });  
            }
        };
        axiosUserData();
    }, [navigate]);

    // Esta función nos sirve para cerrar la sesión    
    const handleLogOut = () => {
        localStorage.removeItem('token');
        setLoggedOut(true);
        console.log('Token removed:', localStorage.getItem('token'));
        navigate('/');        
    }

    const defaultAvatar = "https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg";
    
    return (
        <nav className="flex items-center gap-x-2 mr-8">
            {/* este seria el menu de las notificaciones */}
            <Menu>                                
                <NotificationMenu />
            </Menu>
            {/* aca comienza el menu desplegable del usuario */}
            <Menu>
                <MenuButton className="flex cursor-pointer items-center gap-x-2 hover:bg-primary p-2 rounded-lg transition-colors">
                <img 
                    src={user.fotoPerfil || defaultAvatar } alt="img-user"
                    className="w-10 h-10 object-cover rounded-full"
                />
                <span className="text-white font-bold">{student?.nombre || userRole.charAt(0).toUpperCase() + userRole.slice(1)} {student?.apellido}</span>
                <RiArrowDownSLine className="text-2xl" />
                </MenuButton>
                <MenuItems anchor='bottom' className='bg-primary mt-1 p-4 rounded-lg'>
                    <MenuItem as='div' className='p-0'>
                            <section className="rounded-lg transition-colors text-white flex items-center gap-x-4 py-2 px-4">
                                <img 
                                    src={user.fotoPerfil || defaultAvatar } alt="img-user"
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="text-white text-sm">{student?.nombre || userRole.charAt(0).toUpperCase() + userRole.slice(1)} {student?.apellido}</span>
                                    <span className="text-white text-xm">{user.email}</span>
                                </div>
                            </section>
                            
                    </MenuItem>
                    <hr className="my-4 border-gray-500" />

                    <MenuItem as='div' className='p-0'>
                            <Link to='/admin/usuario' className="rounded-lg transition-colors text-white hover:bg-teal-400 flex items-center gap-x-4 py-2 px-4 flex-1">
                                <RiSettings3Line className="text-2xl" />
                                Configuración                                                
                            </Link>
                            
                    </MenuItem>
                    <hr className="my-4 border-gray-500" />

                    <MenuItem as='div' className='p-0'>
                        <button
                            onClick={handleLogOut}
                            className="w-full cursor-pointer rounded-lg transition-colors text-white hover:bg-teal-400 flex items-centerr gap-x-4 py-2 px-4 flex-1">
                            <RiLogoutCircleRLine />
                            Cerrar Sesión                                      
                        </button>                            
                    </MenuItem>
                </MenuItems>                   
            </Menu>
        </nav>        
    );
    
}
export default NavHeader;