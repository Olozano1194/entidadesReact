import { Link } from "react-router-dom";
// icons
import {
  RiMessage3Fill,
  RiCalendarTodoLine,
  RiHome8Line,
  RiUserLine,
  RiArrowRightSLine,
} from "react-icons/ri";
// Menus
import type { SubMenuState } from "../../SideBar";

interface SidebarAdminProps {
  showSubmenu: SubMenuState;
  handleToggleSubMenu: (submenu: keyof SubMenuState) => void;
}

const SidebarTeacher: React.FC<SidebarAdminProps> = ({
  showSubmenu,
  handleToggleSubMenu,
}) => {
  return (
    <ul className="">
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
      {/* Students */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu2")}
            className="bg-emerald-800/40 border-l-4 border-emerald-400 flex font-semibold items-center gap-2 py-3 px-4 rounded-r-lg text-emerald-400 transition-transform active:translate-x-1"
          >
            {" "}
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
            <li>
              <Link
                to="registrar-miembro-day"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Registrar estudiante
              </Link>
            </li>
            <li>
              <Link
                to="miembros-day"
                className="border-l border-emerald-900 block ml-6 py-2 px-4 relative transition-colors text-emerald-100/60 hover:text-white before:border-4 before:border-secondary before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:w-3"
              >
                Ver estudiante
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
export default SidebarTeacher;
