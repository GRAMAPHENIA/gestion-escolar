'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { getInstitutions } from '@/utils/storage'; // Funciones para obtener estudiantes y la institución
import { Institution } from '@/types/Institution';  // Importar tipo Institution

const StudentsPage = ({ params }: { params: { id: string } }) => {
  const [students, setStudents] = useState<Institution[]>([]);  // Especificamos el tipo del estado
  const router = useRouter();

  useEffect(() => {
    const studentsData = getInstitutions(params.id);  // Obtener estudiantes de la institución por id
    setStudents(studentsData);
  }, [params.id]);

  const handleAddStudent = () => {
    // Lógica para agregar un estudiante
    router.push(`/institutions/${params.id}/students/add`);
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <h1 className="text-2xl font-semibold">Estudiantes de la Institución</h1>
      <button 
        onClick={handleAddStudent}
        className="bg-green-500 text-white p-2 rounded-md mt-4"
      >
        Agregar Estudiante
      </button>
      <div className="mt-4">
        <ul>
          {students.length === 0 ? (
            <p>No hay estudiantes registrados.</p>
          ) : (
            students.map((student) => (
              <li key={student.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md mt-2">
                <span>{student.name}</span>
                <button 
                  onClick={() => router.push(`/institutions/${params.id}/students/${student.id}`)}
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

export default StudentsPage;
