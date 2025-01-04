// /app/utils/storage.ts

import { Institution } from "@/types/Institution";
import { InstitutionCalendar } from "@/types/InstitutionCalendar"; // Si tienes un tipo para el calendario de instituciones

const INSTITUTIONS_KEY = "institutions";
const STORAGE_KEY = "institutions";

// Obtener todas las instituciones desde localStorage
export const getInstitutions = (): Institution[] => {
  if (typeof window !== "undefined") {
    const institutionsData = localStorage.getItem(INSTITUTIONS_KEY);
    return institutionsData ? JSON.parse(institutionsData) : [];
  }
  return [];
};

// Guardar una nueva institución
export const saveInstitution = (newInstitution: Institution): void => {
  if (typeof window !== "undefined") {
    const institutions = getInstitutions();
    institutions.push(newInstitution);
    localStorage.setItem(INSTITUTIONS_KEY, JSON.stringify(institutions));
  }
};

// Obtener una institución por ID
export const getInstitutionById = (id: string): Institution | null => {
  if (typeof window !== "undefined") {
    const institutions = getInstitutions();
    return institutions.find((institution) => institution.id === id) || null;
  }
  return null;
};

// Obtener el calendario de una institución específica
export const getInstitutionCalendar = (
  institutionId: string
): InstitutionCalendar[] => {
  if (typeof window !== "undefined") {
    const calendarData = localStorage.getItem(
      `institution-calendar-${institutionId}`
    );
    return calendarData ? JSON.parse(calendarData) : [];
  }
  return [];
};

// Guardar el calendario de una institución
export const saveInstitutionCalendar = (
  institutionId: string,
  calendar: InstitutionCalendar[]
): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      `institution-calendar-${institutionId}`,
      JSON.stringify(calendar)
    );
  }
};

// Obtener las tareas de una institución
export const getInstitutionTasks = (institutionId: string) => {
  // Simulación de tareas
  const tasks = [
    {
      id: "1",
      name: "Reunión administrativa",
      institutionId: "1",
      description: "Reunión con el equipo de administración.",
    },
    {
      id: "2",
      name: "Actualización de documentos",
      institutionId: "1",
      description: "Actualizar los documentos de los proyectos actuales.",
    },
    {
      id: "3",
      name: "Revisión de proyectos",
      institutionId: "2",
      description: "Revisión de los proyectos en curso.",
    },
  ];

  // Filtrar las tareas por institutionId
  return tasks.filter((task) => task.institutionId === institutionId);
};

// Obtener evaluaciones de una institución
export const getInstitutionEvaluations = (institutionId: string) => {
  // Simulación de evaluaciones
  const evaluations = [
    { id: "1", institutionId: "1", name: "Evaluación 1" },
    { id: "2", institutionId: "1", name: "Evaluación 2" },
    { id: "3", institutionId: "2", name: "Evaluación 3" },
  ];

  // Filtrar las evaluaciones por institutionId
  return evaluations.filter(
    (evaluation) => evaluation.institutionId === institutionId
  );
};

// Obtener las clases de una institución
export const getInstitutionClasses = (institutionId: string) => {
  // Simulación de clases
  const classes = [
    { id: "1", name: "Clase 1", institutionId: "1" },
    { id: "2", name: "Clase 2", institutionId: "1" },
    { id: "3", name: "Clase 3", institutionId: "2" },
  ];

  // Filtrar las clases por institutionId
  return classes.filter(
    (classItem) => classItem.institutionId === institutionId
  );
};

// utils/storage.ts

export const removeInstitution = (institutionId: string) => {
  const institutions = getInstitutions();
  const updatedInstitutions = institutions.filter(
    (institution) => institution.id !== institutionId
  );
  localStorage.setItem("institutions", JSON.stringify(updatedInstitutions));
};

export const updateInstitution = (updatedInstitution: Institution): void => {
  const institutions = getInstitutions();
  const index = institutions.findIndex(
    (institution) => institution.id === updatedInstitution.id
  );

  if (index !== -1) {
    institutions[index] = { ...institutions[index], ...updatedInstitution };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(institutions));
  } else {
    console.error("Institution not found for update");
  }
};


