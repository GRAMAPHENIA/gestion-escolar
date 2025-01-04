// Ruta: components/Navbar/Navbar.tsx

import React from "react";
import { useRouter } from "next/navigation";
import { HiCog, HiPlusCircle } from "react-icons/hi"; // Iconos de Heroicons

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-[#1c2431] p-4 shadow-md rounded-lg mt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold flex-1">GE</h1>
        <div className="flex space-x-6">
          {/* Botón de Configuración */}
          <button
            onClick={() => router.push("/configuracion")}
            className="text-white p-2 rounded-md hover:bg-[#14b8a6] transition duration-200 flex items-center"
          >
            <HiCog className="inline-block mr-2" />
            Configuración
          </button>

          {/* Botón de Agregar Instituciones */}
          <button
            onClick={() => router.push("/agregar-institucion")}
            className="text-white p-2 rounded-md hover:bg-[#14b8a6] transition duration-200 flex items-center"
          >
            <HiPlusCircle className="inline-block mr-2" />
            Agregar Institución
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
