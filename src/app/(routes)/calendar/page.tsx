"use client";

import React, { useEffect, useState } from "react";
import { getInstitutionCalendar } from "@/utils/storage"; // Función para obtener el calendario de la institución
import { InstitutionCalendar } from "@/types/InstitutionCalendar"; // Asegúrate de tener este tipo

const CalendarPage = ({ params }: { params: { id: string } }) => {
  // Especificamos el tipo del estado
  const [calendar, setCalendar] = useState<InstitutionCalendar[]>([]);

  useEffect(() => {
    const calendarData = getInstitutionCalendar(params.id); // Obtener calendario de la institución por id
    setCalendar(calendarData); // Asegúrate de que calendarData sea de tipo InstitutionCalendar[]
  }, [params.id]);

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-2xl font-semibold">Calendario de {params.id}</h1>
      <div className="mt-4">
        {/* Aquí podría ir un calendario dinámico */}
        <p>
          Calendario de actividades, clases y evaluaciones de la institución
        </p>
        {/* Aquí podrías mapear las actividades del calendario */}
        <ul>
          {calendar.length === 0 ? (
            <p>No hay eventos registrados en el calendario.</p>
          ) : (
            calendar.map((event) => (
              <li key={event.id} className="p-2">
                <span>{event.name}</span> - <span>{event.date}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
