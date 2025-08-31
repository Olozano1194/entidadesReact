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
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <RiHome8Line className="text-secondary-500" /> Inicio
          </Link>
        </li>
      </ul>
      {/* Students */}
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={() => handleToggleSubMenu("menu2")}
            className="w-full flex items-center justify-between cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            {" "}
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
                to="registrar-miembro-day"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
              >
                Registrar estudiante
              </Link>
            </li>
            <li>
              <Link
                to="miembros-day"
                className="py-2 px-4 border-l border-slate-400 block ml-6 text-white font-semibold relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary hover:text-gray-400 transition-colors"
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
            className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-teal-400 text-white font-semibold transition-colors"
          >
            <RiMessage3Fill className="text-secondary-500" />
            Mensajes
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
export default SidebarTeacher;
