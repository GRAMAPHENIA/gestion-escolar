"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getInstitutionTasks } from "@/utils/storage"; // Función para obtener tareas administrativas
import { ColumnType, Task } from "@/types/Task"; 

const TasksPage = ({ params }: { params: { id: string } }) => {
  // Especificamos el tipo del estado
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const tasksData = getInstitutionTasks(params.id).map(task => ({
      ...task,
      title: task.name, // Assuming 'name' can be used as 'title'
      date: new Date().toISOString(), // Placeholder date
      tags: [], // Placeholder tags
      columnId: 'default' as ColumnType // Placeholder columnId with correct type
    })); // Obtener tareas administrativas
    setTasks(tasksData); // Asegúrate de que tasksData sea de tipo Task[]
  }, [params.id]);

  const handleAddTask = () => {
    // Lógica para agregar una tarea administrativa
    router.push(`/institutions/${params.id}/tasks/add`);
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <h1 className="text-2xl font-semibold">
        Tareas Administrativas de la Institución
      </h1>
      <button
        onClick={handleAddTask}
        className="bg-green-500 text-white p-2 rounded-md mt-4"
      >
        Agregar Tarea Administrativa
      </button>
      <div className="mt-4">
        <ul>
          {tasks.length === 0 ? (
            <p>No hay tareas administrativas registradas.</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md mt-2"
              >
                <span>{task.name}</span>
                <button
                  onClick={() =>
                    router.push(`/institutions/${params.id}/tasks/${task.id}`)
                  }
                  className="bg-blue-500 text-white p-1 rounded-md"
                >
                  Ver detalles
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TasksPage;
