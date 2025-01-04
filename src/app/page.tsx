"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { Institution } from "../types/Institution";
import { getInstitutions, removeInstitution, updateInstitution } from "@/utils/storage";

const Page = () => {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [editingInstitution, setEditingInstitution] = useState<Institution | null>(null);

  useEffect(() => {
    const institutionsData = getInstitutions();
    setInstitutions(institutionsData);
  }, []);

  const handleDeleteInstitution = (institutionId: string) => {
    removeInstitution(institutionId);
    setInstitutions((prevInstitutions) =>
      prevInstitutions.filter((institution) => institution.id !== institutionId)
    );
  };

  const handleEditInstitution = (updatedInstitution: Institution) => {
    updateInstitution(updatedInstitution);
    setInstitutions((prevInstitutions) =>
      prevInstitutions.map((institution) =>
        institution.id === updatedInstitution.id ? updatedInstitution : institution
      )
    );
    setEditingInstitution(null); // Cerrar formulario de edición
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1b1e24] max-w-7xl mx-auto">
      <Navbar />
      <main className="flex-grow">
        <h2 className="text-2xl font-medium text-white mt-8 mb-4">Instituciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {institutions.length === 0 ? (
            <p className="text-white">
              No hay instituciones disponibles. Añade una institución.
            </p>
          ) : (
            institutions.map((institution) => (
              <div
                key={institution.id}
                className="bg-[#283345] text-white shadow-md p-4 border border-slate-400/10 rounded-lg"
              >
                <h3 className="text-xl font-medium">{institution.name}</h3>
                {institution.description && (
                  <p className="text-gray-300 mt-2 text-sm">{institution.description}</p>
                )}
                {institution.address && (
                  <p className="text-gray-300 mt-2 text-sm">Dirección: {institution.address}</p>
                )}
                {institution.phone && (
                  <p className="text-gray-300 mt-2 text-sm">Teléfono: {institution.phone}</p>
                )}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() =>
                      router.push(`/institucion/${institution.id}`)
                    }
                    className="bg-[#14b8a6] text-white px-4 py-2 rounded-md hover:bg-[#0d9488] transition duration-200"
                  >
                    Ver detalles
                  </button>
                  <button
                    onClick={() => setEditingInstitution(institution)}
                    className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500/90 transition duration-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteInstitution(institution.id)}
                    className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500/90 transition duration-200"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {editingInstitution && (
          <EditInstitutionForm
            institution={editingInstitution}
            onSave={handleEditInstitution}
            onCancel={() => setEditingInstitution(null)}
          />
        )}
      </main>
    </div>
  );
};

const EditInstitutionForm = ({
  institution,
  onSave,
  onCancel,
}: {
  institution: Institution;
  onSave: (updatedInstitution: Institution) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(institution);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#283345] p-4 rounded-lg shadow-md text-white mt-4"
    >
      <h3 className="text-xl font-medium mb-4">Editar Institución</h3>
      <div className="mb-4">
        <label className="block text-sm mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-[#1b1e24] text-white border border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Descripción</label>
        <input
          type="text"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-[#1b1e24] text-white border border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Dirección</label>
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-[#1b1e24] text-white border border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Teléfono</label>
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-[#1b1e24] text-white border border-gray-600"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default Page;
