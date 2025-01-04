// Ruta: components/Sidebar/Sidebar.tsx

import React from "react";
import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaTasks,
  FaCalendarAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface NavigationOption {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navigationOptions: NavigationOption[]; // Opciones de navegación
  institution?: {
    logo?: string; // Nombre del ícono de react-icons
    name?: string; // Nombre de la institución
    description?: string; // Descripción breve
  };
  setActiveSection: (section: string) => void; // Función para cambiar la sección activa
}

// Mapeo de nombres de íconos a componentes de react-icons
const iconMap: { [key: string]: IconType } = {
  FaUserGraduate: FaUserGraduate,
  FaBook: FaBook,
  FaClipboardList: FaClipboardList,
  FaTasks: FaTasks,
  FaCalendarAlt: FaCalendarAlt,
  FaHome: FaHome,
  // Agrega más íconos si es necesario
};

const Sidebar: React.FC<SidebarProps> = ({
  navigationOptions,
  institution,
  setActiveSection,
}) => {
  // Función para obtener el componente de ícono basado en el nombre
  const getIcon = (iconName: string): React.ReactNode => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? (
      <IconComponent className="h-6 w-6" />
    ) : (
      <FaUserGraduate className="h-6 w-6" />
    );
  };

  return (
    <aside className="w-64 h-full fixed bg-slate-700/20">
      <div className="bg-slate-800 p-6 border border-slate-700 mx-4 rounded-lg mt-4">
        {/* Información de la institución */}
        <div className="flex items-center">
          <div className="mr-4">
            {institution?.logo ? getIcon(institution.logo) : <div>No Logo</div>}{" "}
            {/* Mostrar el ícono */}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#14b8a6]">
              {institution?.name || "Sin nombre"} {/* Mostrar el nombre */}
            </h2>
            <p className="text-sm text-gray-400">
              {institution?.description || "Sin descripción"}{" "}
              {/* Mostrar la descripción */}
            </p>
          </div>
        </div>
      </div>
      {/* Navegación */}
      <nav className="m-4 pt-6 px-4 bg-slate-800 h-full rounded-md border border-slate-700">
        <ul>
          {navigationOptions.map((option) => (
            <li key={option.path} className="mb-2">
              <button
                onClick={() => setActiveSection(option.path)} // Cambiar a la sección seleccionada
                className="w-full flex items-center px-4 py-2 text-left text-gray-300 hover:bg-[#14b8a6] hover:text-black/70 transition rounded-md"
              >
                {option.icon}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
