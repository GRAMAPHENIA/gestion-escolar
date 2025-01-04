"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Importa useRouter
import { Institution } from "@/types/Institution";
import { getInstitutionById } from "@/utils/storage";
// import Calendar from "@/components/dashboard-calendar/Calendar/Calendar";
import {
  FaCalendarAlt,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaTasks,
  FaHome,
} from "react-icons/fa";
import Sidebar from "@/components/Sidebar/Sidebar";
import Board from "@/components/dashboard-calendar/Board";

export default function InstitutionPage() {
  const { id } = useParams();
  const router = useRouter(); // Inicializa useRouter
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (typeof id === "string") {
      const data = getInstitutionById(id);
      setInstitution(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c2431b6]">
        <p className="text-lg font-semibold text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c2431b6]">
        <p className="text-lg font-semibold text-red-400">
          Institución no encontrada.
        </p>
      </div>
    );
  }

  // Opciones de navegación para el sidebar con íconos de react-icons
  const navigationOptions = [
    {
      label: "Inicio",
      path: "/", // Ruta a la página raíz
      icon: <FaHome className="mr-3" />,
    },
    {
      label: "Calendario",
      path: "calendario",
      icon: <FaCalendarAlt className="mr-3" />,
    },
    {
      label: "Estudiantes",
      path: "students",
      icon: <FaUserGraduate className="mr-3" />,
    },
    { label: "Clases", path: "classes", icon: <FaBook className="mr-3" /> },
    {
      label: "Evaluaciones",
      path: "evaluations",
      icon: <FaClipboardList className="mr-3" />,
    },
    {
      label: "Tareas",
      path: "tasks",
      icon: <FaTasks className="mr-3" />,
    },
  ];

  function renderSection(): React.ReactNode {
    switch (activeSection) {
      case "calendario":
        return (
          <div>
            {/* <calendario /> */}
            <Board />
          </div>
        );
      case "students":
        return <div>Estudiantes</div>;
      case "classes":
        return <div>Clases</div>;
      case "evaluations":
        return <div>Evaluaciones</div>;
      case "tasks":
        return <div>Tareas Administrativas</div>;
      default:
        return <div>Seleccione una sección</div>;
    }
  }

  return (
    <div>
      <Sidebar
        navigationOptions={navigationOptions}
        institution={{
          logo: institution.logo,
          name: institution.name,
          description: institution.description
            ? String(institution.description)
            : undefined,
        }}
        setActiveSection={(section: string) => {
          if (section === "/") {
            router.push("/"); // Navegar a la página raíz
          } else {
            setActiveSection(section);
          }
        }}
      />

      {/* Contenido Principal */}
      <main className="ml-64 flex-grow p-6">
        <h2 className="text-3xl font-bold text-white mb-6 capitalize tracking-wide pb-2">
          {activeSection}
        </h2>
        {renderSection()}
      </main>
    </div>
  );
}
