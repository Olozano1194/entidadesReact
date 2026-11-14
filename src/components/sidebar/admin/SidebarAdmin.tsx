import { NavLink } from "react-router-dom";
// icons
import {
  RiMessage3Fill,
  RiCalendarTodoLine,  
  RiUserLine,
  RiArrowRightSLine,
  RiShieldUserLine,
} from "react-icons/ri";
import { MdOutlineSupportAgent, MdOutlineDashboard, MdOutlineAutoStories } from "react-icons/md";
import { BiSolidInstitution } from "react-icons/bi";
// Menus
import type { SubMenuState } from "../../SideBar";

interface SidebarAdminProps {
  showSubmenu: SubMenuState;
  handleToggleSubMenu: (submenu: keyof SubMenuState) => void;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ showSubmenu, handleToggleSubMenu }) => {
  
  return (
    <ul>
      {/* Home */}
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-emerald-800/40 border-l-4 border-emerald-400 flex font-semibold items-center gap-2 py-3 px-4 rounded-r-lg text-emerald-400 transition-transform active:translate-x-1"
                : "flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all hover:text-white hover:bg-emerald-800/20"
            }
          >
            <MdOutlineDashboard /> 
            Inicio
          </NavLink>
        </li>
      </ul>
      {/* Teacher */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu1")}
            className="flex items-center justify-between cursor-pointer py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <span className="flex items-center gap-2">
              <MdOutlineAutoStories />
              Docentes
            </span>
            <RiArrowRightSLine
              className={`mt-1 ${
                showSubmenu.menu1 ? "rotate-90" : ""
              } transition-all`}
            />
          </button>
          <ul className={`mt-2 ${!showSubmenu.menu1 ? "hidden" : ""}`}>
            {/* <li>
              <NavLink
                to="registrar-miembro/"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Docente
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="docentes"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Docente
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
      {/* Students */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu2")}
            className="flex items-center justify-between cursor-pointer py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <span className="flex items-center gap-2">
              <RiUserLine />
              Estudiantes
            </span>
            <RiArrowRightSLine
              className={`mt-1 ${
                showSubmenu.menu2 ? "rotate-90" : ""
              } transition-all`}
            />
          </button>
          <ul className={`mt-2 ${!showSubmenu.menu2 ? "hidden" : ""}`}>
            {/* <li>
              <NavLink
                to="registerStudent"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Estudiante
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="alumnos"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Estudiante
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
      {/* Institutions */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu3")}
            className="flex items-center justify-between cursor-pointer py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <span className="flex items-center gap-2">
              <BiSolidInstitution />
              Instituciones
            </span>
            <RiArrowRightSLine
              className={`mt-1 ${
                showSubmenu.menu3 ? "rotate-90" : ""
              } transition-all`}
            />
          </button>
          <ul
            className={`mt-2 ${
              !showSubmenu.menu3 ? "hidden" : ""
            } transition-all`}
          >
            <li>
              <NavLink
                to="registerInstitutions"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Registrar Institución
              </NavLink>
            </li>
            <li>
              <NavLink
                to="instituciones"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Institución
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
      {/* Users */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu4")}
            className="flex items-center justify-between cursor-pointer py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <span className="flex items-center gap-2">
              <RiUserLine />
              Usuario
            </span>
            <RiArrowRightSLine
              className={`mt-1 ${
                showSubmenu.menu4 ? "rotate-90" : ""
              } transition-all`}
            />
          </button>
          <ul
            className={`mt-2 ${
              !showSubmenu.menu4 ? "hidden" : ""
            } transition-all`}
          >
            <li>
              <NavLink
                to="registerUser"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Registrar Usuario
              </NavLink>
            </li>
            <li>
              <NavLink
                to="usuarios"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Usuarios
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
      {/* Roles */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu5")}
            className="flex items-center justify-between cursor-pointer py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <span className="flex items-center gap-2">
              <RiShieldUserLine />
              Roles
            </span>
            <RiArrowRightSLine
              className={`mt-1 ${
                showSubmenu.menu5 ? "rotate-90" : ""
              } transition-all`}
            />
          </button>
          <ul
            className={`mt-2 ${
              !showSubmenu.menu5 ? "hidden" : ""
            } transition-all`}
          >
            <li>
              <NavLink
                to="registerRol"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Registrar Rol
              </NavLink>
            </li>
            <li>
              <NavLink
                to="roles"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Roles
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
      {/* Message */}
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/"
            end
            className="flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <RiMessage3Fill />
            Mensajes
          </NavLink>
        </li>
      </ul>
      {/* Support */}
      <ul className="flex flex-col gap-4">
        <li>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all hover:text-white hover:bg-emerald-800/20"
          >
            <MdOutlineSupportAgent />
            Soporte técnico
          </a>
        </li>
      </ul>
      {/* Calendar */}
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/"
            end
            className="flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all hover:text-white hover:bg-emerald-800/20"
          >
            <RiCalendarTodoLine />
            Calendario
          </NavLink>
        </li>
      </ul>
    </ul>
  );
};
export default SidebarAdmin;