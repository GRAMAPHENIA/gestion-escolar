import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { getInstitutionClasses } from '@/utils/storage'; // Función para obtener clases

interface Class {
  id: string;
  name: string;
  institutionId: string;
}

const ClassesPage = ({ params }: { params: { id: string } }) => {
  const [classes, setClasses] = useState<Class[]>([]); // Especificamos el tipo de datos aquí
  const router = useRouter();

  useEffect(() => {
    const classesData = getInstitutionClasses(params.id); // Obtener clases de la institución por id
    setClasses(classesData);
  }, [params.id]);

  const handleAddClass = () => {
    // Lógica para agregar una clase
    router.push(`/institutions/${params.id}/classes/add`);
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <h1 className="text-2xl font-semibold">Clases de la Institución</h1>
      <button 
        onClick={handleAddClass}
        className="bg-green-500 text-white p-2 rounded-md mt-4"
      >
        Agregar Clase
      </button>
      <div className="mt-4">
        <ul>
          {classes.length === 0 ? (
            <p>No hay clases registradas.</p>
          ) : (
            classes.map((classItem) => (
              <li key={classItem.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md mt-2">
                <span>{classItem.name}</span>
                <button 
                  onClick={() => router.push(`/institutions/${params.id}/classes/${classItem.id}`)}
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

export default ClassesPage;
