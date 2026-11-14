import { Link } from "react-router-dom";
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
          <Link
            to="/admin"
            className="bg-emerald-800/40 border-l-4 border-emerald-400 flex font-semibold items-center gap-2 py-3 px-4 rounded-r-lg text-emerald-400 transition-transform active:translate-x-1"
          >
            <MdOutlineDashboard /> 
            Inicio
          </Link>
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
              <Link
                to="registrar-miembro/"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Docente
              </Link>
            </li> */}
            <li>
              <Link
                to="docentes"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Docente
              </Link>
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
              <Link
                to="registerStudent"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Estudiante
              </Link>
            </li> */}
            <li>
              <Link
                to="alumnos"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Estudiante
              </Link>
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
              <Link
                to="registerInstitutions"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Registrar Institución
              </Link>
            </li>
            <li>
              <Link
                to="instituciones"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Institución
              </Link>
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
              <Link
                to="registerUser"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Registrar Usuario
              </Link>
            </li>
            <li>
              <Link
                to="usuarios"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Usuarios
              </Link>
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
              <Link
                to="registerRol"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Registrar Rol
              </Link>
            </li>
            <li>
              <Link
                to="roles"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver Roles
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      {/* Message */}
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            to="/"
            className="flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <RiMessage3Fill />
            Mensajes
          </Link>
        </li>
      </ul>
      {/* Support */}
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            to="#"
            className="flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all hover:text-white hover:bg-emerald-800/20"
          >
            <MdOutlineSupportAgent />
            Soporte técnico
          </Link>
        </li>
      </ul>
      {/* Calendar */}
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            to="/"
            className="flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all hover:text-white hover:bg-emerald-800/20"
          >
            <RiCalendarTodoLine />
            Calendario
          </Link>
        </li>
      </ul>
    </ul>
  );
};
export default SidebarAdmin;