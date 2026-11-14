import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// icons
import { RiMenu3Line, RiCloseLine, RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineSchool } from "react-icons/md";
//API
import { getUserProfile } from "../api/user.api";
import { getRoleById } from "../api/roles.api";
//Mensajes
import { toast } from "react-hot-toast";
//Models
import type { User } from "../types/user.model";
import type { Rol } from "../types/rol.models";
// Components
import SidebarAdmin from "./sidebar/admin/SidebarAdmin";
import SidebarStudent from "./sidebar/student/SidebarStudent";
import SidebarTeacher from "./sidebar/teacher/SidebarTeacher";

export interface SubMenuState {
  menu1: boolean;
  menu2: boolean;
  menu3: boolean;
  menu4: boolean;
  menu5: boolean;
}

const SideBar = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState<SubMenuState>({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
  });
  const [, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [, setLoggedOut] = useState(false);

  //este useEfect es para obtener el rol del usuario
  useEffect(() => {
    const obtenerRol = async () => {
      try {
        const { user } = await getUserProfile();
        //console.log('User data received:', user.rol);
        setUser(user);

        //Si el rol viene como objeto
        if (user.rol && typeof user.rol === "object" && "nombre" in user.rol) {
          setUserRole((user.rol as Rol).nombre);
        }
        //Si el rol viene como String
        else if (typeof user.rol === "string") {
          const rol = await getRoleById(user.rol);
          setUserRole(rol.nombre);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error al cargar los datos";
        toast.error(errorMessage);
      }
    };
    obtenerRol();
  }, []);

  //Funcion para mostrar y ocultar los submenus
  const handleToggleSubMenu = (submenu: keyof SubMenuState) => {
    setShowSubMenu((prev) => ({
      ...prev,
      [submenu]: !prev[submenu],
    }));
  };

  // Esta función nos sirve para cerrar la sesión
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedOut(true);
    console.log("Token removed:", localStorage.getItem("token"));
    navigate("/");
  };

  return (
    <>
      <aside
        className={`antialiased bg-emerald-950 border-r border-emerald-900 fixed flex flex-col justify-between h-full py-8 px-4 overflow-y-scroll shadow-2xl space-y-2 tracking-tight xl:static w-[60%] md:w-[40%] lg:w-[35%] xl:h-[100vh] xl:w-auto top-0 z-50 ${
          toggleMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <section>
          {/* title */}
          <div className="flex gap-3 items-center mb-8 px-4">
            <div className="bg-emerald-500 flex h-10 items-center justify-center rounded-lg w-10">
              <span className="text-white">
                <MdOutlineSchool />
              </span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-white tracking-wide">
                EduControl
              </h1>
              <p className="text-xs text-emerald-400/70">{userRole.charAt(0).toUpperCase() + userRole.slice(1) ||
                "Cargando..."}
              </p>
            </div>            
          </div>          
          {/* Menu */}
          <nav className="flex-1 overflow-y-auto space-y-1 sidebar-scroll">
            {userRole.includes("admin") ? (
              <SidebarAdmin
                handleToggleSubMenu={handleToggleSubMenu}
                showSubmenu={showSubMenu}
              />
            ) : userRole.includes("docente") ? (
              <SidebarTeacher
                handleToggleSubMenu={handleToggleSubMenu}
                showSubmenu={showSubMenu}
              />
            ) : (
              <SidebarStudent
                handleToggleSubMenu={handleToggleSubMenu}
                showSubmenu={showSubMenu}
              />
            )}
          </nav>
        </section>
        {/* Log out */}
        <nav>
          <ul className="border-t border-emerald-900 flex flex-col gap-4">
            <li>
              <button
                onClick={handleLogOut}
                className="flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
              >
                <RiLogoutCircleLine className="text-secondary-500" />
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <button
        onClick={() => setToggleMenu(!toggleMenu)}
        className="xl:hidden fixed bottom-4 right-4 cursor-pointer bg-emerald-950 text-white font-bold p-3 rounded-full z-50"
      >
        {toggleMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};
export default SideBar;
