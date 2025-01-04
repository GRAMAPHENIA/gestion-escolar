import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getInstitutionEvaluations } from "@/utils/storage"; // Función para obtener evaluaciones
import { Evaluation } from "@/types/Evaluation";

const EvaluationsPage = ({ params }: { params: { id: string } }) => {
  // Especificamos el tipo del estado como un array de Evaluations
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const evaluationsData = getInstitutionEvaluations(params.id); // Obtener evaluaciones de la institución
    setEvaluations(evaluationsData); // Asignar las evaluaciones
  }, [params.id]);

  const handleAddEvaluation = () => {
    // Lógica para agregar una evaluación
    router.push(`/institutions/${params.id}/evaluations/add`);
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <h1 className="text-2xl font-semibold">Evaluaciones de la Institución</h1>
      <button
        onClick={handleAddEvaluation}
        className="bg-green-500 text-white p-2 rounded-md mt-4"
      >
        Agregar Evaluación
      </button>
      <div className="mt-4">
        <ul>
          {evaluations.length === 0 ? (
            <p>No hay evaluaciones registradas.</p>
          ) : (
            evaluations.map((evaluation) => (
              <li
                key={evaluation.id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md mt-2"
              >
                <span>{evaluation.name}</span>
                <button
                  onClick={() =>
                    router.push(
                      `/institutions/${params.id}/evaluations/${evaluation.id}`
                    )
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

export default EvaluationsPage;
