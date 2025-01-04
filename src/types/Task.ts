import { ReactNode } from "react";

export interface Task {
  name: ReactNode;
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  columnId: ColumnType;
  photoUrl?: string | null;
  dueDate?: string;
  priority?: string;
}

export type ColumnType = 'Pendiente' | 'Progreso' | 'Finalizado';

export const columns: ColumnType[] = ['Pendiente', 'Progreso', 'Finalizado'];

