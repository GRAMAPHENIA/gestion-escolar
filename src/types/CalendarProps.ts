import { Task } from "./Task";

// Ruta: src/types/CalendarProps.ts
export interface CalendarProps {
    tasks: Task[]; 
    onDayClick?: (date: Date) => void; // Callback opcional para manejar clics en días
    institutionFilters: string[]; // O el tipo que corresponda
  }
  