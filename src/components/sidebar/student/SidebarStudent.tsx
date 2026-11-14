import { Link } from "react-router-dom";
// icons
import {
  RiMessage3Fill,
  RiCalendarTodoLine,
  RiHome8Line,  
  RiArrowRightSLine,
} from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";
import { FaUserCheck, FaFileAlt } from "react-icons/fa";
// Menus
import type { SubMenuState } from "../../SideBar";

interface SidebarAdminProps {
  showSubmenu: SubMenuState;
  handleToggleSubMenu: (submenu: keyof SubMenuState) => void;
}

const SidebarStudent: React.FC<SidebarAdminProps> = ({
  showSubmenu,
  handleToggleSubMenu,
}) => {
  return (
    <ul>
      {/* Home */}
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            to="/admin"
            className="bg-emerald-800/40 border-l-4 border-emerald-400 flex font-semibold items-center gap-2 py-3 px-4 rounded-r-lg text-emerald-400 transition-transform active:translate-x-1"
          >
            <RiHome8Line /> 
            Inicio
          </Link>
        </li>
      </ul>
      {/* Group */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu1")}
            className="flex items-center justify-between cursor-pointer py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <span className="flex items-center gap-2">
              <MdGroups2 />
              Grupo
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
                Registrar docente
              </Link>
            </li> */}
            <li>
              <Link
                to="miembros"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Ver Grupo
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      {/* Assistance */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu2")}
            className="flex items-center justify-between cursor-pointer py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >            
            <span className="flex items-center gap-2">
              <FaUserCheck />
              Asistencia
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
                to="registrar-miembro/"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar docente
              </Link>
            </li> */}
            <li>
              <Link
                to="miembros"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Ver Grupo
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      {/* Evaluation */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu3")}
            className="flex items-center justify-between cursor-pointer py-3 px-4 rounded-lg text-emerald-100/60 transition-all w-full hover:text-white hover:bg-emerald-800/20"
          >
            <span className="flex items-center gap-2">
              <FaFileAlt />
              Evaluación
            </span>
            <RiArrowRightSLine
              className={`mt-1 ${
                showSubmenu.menu3 ? "rotate-90" : ""
              } transition-all`}
            />
          </button>
          <ul className={`mt-2 ${!showSubmenu.menu3 ? "hidden" : ""}`}>
            {/* <li>
              <Link
                to="registrar-miembro/"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar docente
              </Link>
            </li> */}
            <li>
              <Link
                to="miembros"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Ver Grupo
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
            className="flex items-center cursor-pointer gap-3 py-3 px-4 rounded-lg text-emerald-100/60 transition-all hover:text-white hover:bg-emerald-800/20"
          >
            <RiMessage3Fill />
            Mensajes
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
export default SidebarStudent;