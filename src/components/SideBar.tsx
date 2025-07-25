import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// icons
import { RiMenu3Line, RiCloseLine, RiMessage3Fill, RiCalendarTodoLine, RiLogoutCircleLine, RiHome8Line, RiUserLine, RiArrowRightSLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaCreditCard } from 'react-icons/fa';
//API
import { getUserProfile } from '../api/user.api';
import { getRoleById } from "../api/roles.api";
//Mensajes
import { toast } from 'react-hot-toast';
//Models
import type { User } from "../model/user.model";
import type { Rol } from "../model/rol.models";

interface SubMenuState {
    menu1: boolean,
    menu2: boolean,
    menu3: boolean,
    menu4: boolean,
    menu5: boolean,
};

const SideBar = () => {
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [showSubMenu, setShowSubMenu ] = useState<SubMenuState>({
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false,
        menu5: false,        
    });
    const [, setUser] = useState<User | null >(null);
    const [userRole, setUserRole] = useState<string>('');
    const [, setLoggedOut] = useState(false);

    //este useEfect es para obtener el rol del usuario
    useEffect(() => {
        const obtenerRol = async () => {
            try {
                const { user } = await getUserProfile();
                //console.log('User data received:', user.rol);                
                setUser(user);                
                
                //Si el rol viene como objeto
                if (user.rol && typeof user.rol === 'object' && 'nombre' in user.rol) {
                    setUserRole((user.rol as Rol).nombre);
                }
                //Si el rol viene como String
                else if (typeof user.rol === 'string') {
                    const rol = await getRoleById(user.rol);
                    setUserRole(rol.nombre);
                }
            }catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cargar los datos';
                toast.error(errorMessage);
            }
        };
        obtenerRol();
    }, []);

    //Funcion para mostrar y ocultar los submenus
    const handleToggleSubMenu = (submenu: keyof SubMenuState) => {
        setShowSubMenu(prev => ({
          ...prev,
          [submenu]: !prev[submenu],
        }));
      };

    // Esta función nos sirve para cerrar la sesión    
    const handleLogOut = () => {
        localStorage.removeItem('token');
        setLoggedOut(true);
        console.log('Token removed:', localStorage.getItem('token'));
        navigate('/');        
    }
    
       
    return (
        <>
            <div className={`xl:h-[100vh] bg-primary overflow-y-scroll fixed xl:static w-[60%] md:w-[40%] lg:w-[35%] xl:w-auto h-full top-0 p-3 flex flex-col justify-between z-50 ${toggleMenu ? "left-0" : "-left-full"} transition-all`}>
                <div>
                    <h1 className="text-center text-2xl font-black text-white mb-10">
                    {userRole || 'Cargando...'}
                    <span className="text-secondary-500">.</span>
                    </h1>
                    <nav>
                        {userRole.includes('admin') ? (
                            <ul className="">
                                {/* Home */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <Link to='/admin' className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"><RiHome8Line className="text-secondary-500" /> Inicio
                                        </Link>
                                    </li>                            
                                </ul>
                                {/* Member */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <button onClick={() => handleToggleSubMenu('menu1')} 
                                                    className="w-full flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">      <span className="flex items-center gap-2"><RiUserLine className="text-secondary-500" />Miembro</span>
                                                    <RiArrowRightSLine className={`mt-1 ${showSubMenu.menu1 ? 'rotate-90': ''} transition-all`} />
                                        </button>
                                        <ul className={`mt-2 ${!showSubMenu.menu1 ? 'hidden' : ''}`}>
                                            <li>
                                                <Link to='registrar-miembro/' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Registrar miembro</Link>
                                            </li>
                                            <li>
                                                <Link to='miembros' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Ver  miembros</Link>
                                            </li>
                                        </ul>
                                    </li>                            
                                </ul>
                                {/* Member Day */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <button onClick={() => handleToggleSubMenu('menu2')} 
                                                className="w-full flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">      <span className="flex items-center gap-2"><RiUserLine className="text-secondary-500" />Miembro Diario</span>
                                                <RiArrowRightSLine className={`mt-1 ${showSubMenu.menu2 ? 'rotate-90' : ''} transition-all`} />
                                        </button>
                                        <ul className={`mt-2 ${!showSubMenu.menu2 ? 'hidden' : ''}`}>
                                            <li>
                                                <Link to='registrar-miembro-day' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Registrar miembro</Link>
                                            </li>
                                            <li>
                                                <Link to='miembros-day' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Ver  miembros</Link>
                                            </li>
                                        </ul>
                                    </li>                           
                                </ul>
                                {/* Users */}                        
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <button onClick={() => handleToggleSubMenu('menu3')}  
                                                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"><span className="flex items-center gap-2"><RiUserLine className="text-secondary-500" />Usuario</span>
                                                <RiArrowRightSLine className={`mt-1 ${showSubMenu.menu3 ? 'rotate-90' : ''} transition-all`} />
                                        </button>
                                        <ul className={`mt-2 ${!showSubMenu.menu3 ? 'hidden' : ''} transition-all`} >
                                            <li>
                                                <Link to='register' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Registrar Usuario</Link>
                                            </li>
                                            <li>
                                                <Link to='listUser' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Ver Usuarios</Link>
                                            </li>
                                        </ul>
                                    </li>                           
                                </ul> 
                                {/* MemberShips */}
                                <ul className="flex flex-col gap-2">
                                    <button onClick={() => handleToggleSubMenu('menu4')}  
                                                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-slate-200 text-dark font-semibold transition-colors"><span className="flex items-center gap-2"><FaCreditCard className="text-primary" />Membresía</span>
                                                <RiArrowRightSLine className={`mt-1 ${showSubMenu.menu4 ? 'rotate-90' : ''} transition-all`} />
                                    </button>
                                    <ul className={`mt-2 ${!showSubMenu.menu4 ? 'hidden' : ''} transition-all`} >
                                            <li>
                                                <Link to='registrar-membresia' className="py-2 px-4 border-l border-slate-400 block ml-6 text-dark font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-white transition-colors">Registrar Membresía</Link>
                                            </li>
                                            <li>
                                                <Link to='memberships-list' className="py-2 px-4 border-l border-slate-400 block ml-6 text-dark font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-white transition-colors">Ver Membresías</Link>
                                            </li>
                                    </ul>
                                </ul>
                                {/* Asignar MemberShips */}
                                <ul className="flex flex-col gap-2">
                                    <button onClick={() => handleToggleSubMenu('menu5')}  
                                                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-slate-200 text-dark font-semibold transition-colors"><span className="flex items-center gap-2"><FaCreditCard className="text-primary" />Asignar Membresía</span>
                                                <RiArrowRightSLine className={`mt-1 ${showSubMenu.menu5 ? 'rotate-90' : ''} transition-all`} />
                                    </button>
                                    <ul className={`mt-2 ${!showSubMenu.menu5 ? 'hidden' : ''} transition-all`} >
                                            <li>
                                                <Link to='asignar-membresia' className="py-2 px-4 border-l border-slate-400 block ml-6 text-dark font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-white transition-colors">Asignar Membresía</Link>
                                            </li>
                                            <li>
                                                <Link to='asignar-membresia-list' className="py-2 px-4 border-l border-slate-400 block ml-6 text-dark font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-white transition-colors">Ver Asignaciones de Membresías</Link>
                                            </li>
                                    </ul>
                                </ul>
                                {/* Message */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <Link to='/' 
                                            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">
                                            <RiMessage3Fill className="text-secondary-500" />
                                            Mensajes
                                        </Link>
                                    </li>
                                </ul>
                                {/* Support */}
                                <ul className="flex flex-col gap-4">
                                    <li>
                                        <Link to='#'
                                            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">
                                            <MdOutlineSupportAgent className="text-secondary-500" />
                                            Soporte técnico
                                        </Link>

                                    </li>
                                </ul>
                                {/* Calendar */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <Link to='/'
                                            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">
                                            <RiCalendarTodoLine className="text-secondary-500" />
                                            Calendario
                                        </Link>

                                    </li>
                                </ul>
                            </ul>
                        ) : (
                            <ul className="">
                                {/* Home */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <Link to='/admin' className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"><RiHome8Line className="text-secondary-500" /> Inicio
                                        </Link>
                                    </li>                            
                                </ul>
                                {/* Member */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <button onClick={() => handleToggleSubMenu('menu1')} 
                                                    className="w-full flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">      <span className="flex items-center gap-2"><RiUserLine className="text-secondary-500" />Miembro</span>
                                                    <RiArrowRightSLine className={`mt-1 ${showSubMenu.menu1 ? 'rotate-90': ''} transition-all`} />
                                        </button>
                                        <ul className={`mt-2 ${!showSubMenu.menu1 ? 'hidden' : ''}`}>
                                            <li>
                                                <Link to='registrar-miembro/' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Registrar miembro</Link>
                                            </li>
                                            <li>
                                                <Link to='miembros' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Ver  miembros</Link>
                                            </li>
                                        </ul>
                                    </li>                            
                                </ul>
                                {/* Member Day */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <button onClick={() => handleToggleSubMenu('menu2')} 
                                                className="w-full flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">      <span className="flex items-center gap-2"><RiUserLine className="text-secondary-500" />Miembro Diario</span>
                                                <RiArrowRightSLine className={`mt-1 ${showSubMenu.menu2 ? 'rotate-90' : ''} transition-all`} />
                                        </button>
                                        <ul className={`mt-2 ${!showSubMenu.menu2 ? 'hidden' : ''}`}>
                                            <li>
                                                <Link to='registrar-miembro-day' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Registrar miembro</Link>
                                            </li>
                                            <li>
                                                <Link to='miembros-day' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Ver  miembros</Link>
                                            </li>
                                        </ul>
                                    </li>                           
                                </ul>
                                {/* Asignar MemberShips */}
                                <ul className="flex flex-col gap-2">
                                    <button onClick={() => handleToggleSubMenu('menu5')}  
                                                className="w-full flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"><span className="flex items-center gap-2"><FaCreditCard className="text-secondary-500" />Asignar Membresía</span>
                                                <RiArrowRightSLine className={`mt-1 ${showSubMenu.menu5 ? 'rotate-90' : ''} transition-all`} />
                                    </button>
                                    <ul className={`mt-2 ${!showSubMenu.menu5 ? 'hidden' : ''} transition-all`} >
                                            <li>
                                                <Link to='asignar-membresia' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Asignar Membresía</Link>
                                            </li>
                                            <li>
                                                <Link to='asignar-membresia-list' className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors">Ver Asignaciones de Membresías</Link>
                                            </li>
                                    </ul>
                                </ul>
                                {/* Message */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <Link to='/' 
                                            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">
                                            <RiMessage3Fill className="text-secondary-500" />
                                            Mensajes
                                        </Link>
                                    </li>
                                </ul>
                                {/* Calendar */}
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <Link to='/'
                                            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">
                                            <RiCalendarTodoLine className="text-secondary-500" />
                                            Calendario
                                        </Link>

                                    </li>
                                </ul> 
                            </ul>
                        )}                        
                    </nav>
                </div>

                <nav>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <button                                
                                onClick={handleLogOut}
                                className="w-48 flex items-center cursor-pointer gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors">
                                <RiLogoutCircleLine className="text-secondary-500" />
                                    Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <button 
                onClick={() => setToggleMenu(!toggleMenu)} 
                className="xl:hidden fixed bottom-4 right-4 cursor-pointer bg-primary text-white font-bold p-3 rounded-full z-50">
                {
                    toggleMenu ? <RiCloseLine /> : <RiMenu3Line />
                }
            </button>
        </>
    );
}
export default SideBar;