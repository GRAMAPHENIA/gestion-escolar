// Ruta: components/Sections/SectionsRenderer.tsx

import React from "react";
import Calendar from "@/components/dashboard-calendar/Calendar/Calendar"; // Componente de calendario

interface SectionsRendererProps {
  activeSection: string; // Sección activa seleccionada por el usuario
}

const SectionsRenderer: React.FC<SectionsRendererProps> = ({
  activeSection,
}) => {
  // Renderiza la sección basada en el valor de activeSection
  switch (activeSection) {
    case "calendar":
      return <Calendar />;
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
};

export default SectionsRenderer;
