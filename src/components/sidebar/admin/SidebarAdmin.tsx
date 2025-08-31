import { Link } from "react-router-dom";
// icons
import {
  RiMessage3Fill,
  RiCalendarTodoLine,
  RiHome8Line,
  RiUserLine,
  RiArrowRightSLine,
  RiShieldUserLine,
} from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BiSolidInstitution } from "react-icons/bi";
// Menus
import type { SubMenuState } from "../../SideBar";

interface SidebarAdminProps {
  showSubmenu: SubMenuState;
  handleToggleSubMenu: (submenu: keyof SubMenuState) => void;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ showSubmenu, handleToggleSubMenu }) => {
  
  return (
    <ul className="">
      {/* Home */}
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            to="/admin"
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <RiHome8Line className="text-secondary-500" /> Inicio
          </Link>
        </li>
      </ul>
      {/* Teacher */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu1")}
            className="w-full flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <span className="flex items-center gap-2">
              <RiUserLine className="text-secondary-500" />
              Docentes
            </span>
            <RiArrowRightSLine
              className={`mt-1 ${
                showSubmenu.menu1 ? "rotate-90" : ""
              } transition-all`}
            />
          </button>
          <ul className={`mt-2 ${!showSubmenu.menu1 ? "hidden" : ""}`}>
            <li>
              <Link
                to="registrar-miembro/"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Docente
              </Link>
            </li>
            <li>
              <Link
                to="docentes"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
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
            className="w-full flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <span className="flex items-center gap-2">
              <RiUserLine className="text-secondary-500" />
              Estudiantes
            </span>
            <RiArrowRightSLine
              className={`mt-1 ${
                showSubmenu.menu2 ? "rotate-90" : ""
              } transition-all`}
            />
          </button>
          <ul className={`mt-2 ${!showSubmenu.menu2 ? "hidden" : ""}`}>
            <li>
              <Link
                to="registerStudent"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Estudiante
              </Link>
            </li>
            <li>
              <Link
                to="alumnos"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
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
            className="w-full cursor-pointer flex items-center justify-between py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <span className="flex items-center gap-2">
              <BiSolidInstitution className="text-secondary-500" />
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
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Institución
              </Link>
            </li>
            <li>
              <Link
                to="instituciones"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
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
            className="w-full cursor-pointer flex items-center justify-between py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <span className="flex items-center gap-2">
              <RiUserLine className="text-secondary-500" />
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
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Usuario
              </Link>
            </li>
            <li>
              <Link
                to="usuarios"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
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
            className="w-full cursor-pointer flex items-center justify-between py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <span className="flex items-center gap-2">
              <RiShieldUserLine className="text-secondary-500" />
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
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar Rol
              </Link>
            </li>
            <li>
              <Link
                to="roles"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
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
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <RiMessage3Fill className="text-secondary-500" />
            Mensajes
          </Link>
        </li>
      </ul>
      {/* Support */}
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            to="#"
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <MdOutlineSupportAgent className="text-secondary-500" />
            Soporte técnico
          </Link>
        </li>
      </ul>
      {/* Calendar */}
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            to="/"
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <RiCalendarTodoLine className="text-secondary-500" />
            Calendario
          </Link>
        </li>
      </ul>
    </ul>
  );
};
export default SidebarAdmin;
