"use client";

import React, { JSX, useState } from "react";
import { Institution } from "@/types/Institution";
import { saveInstitution } from "@/utils/storage";
import { FaUniversity, FaExclamationCircle } from "react-icons/fa"; // Importa íconos de React Icons
import { useRouter } from "next/navigation"; // Importa useRouter
import {
  FaRegBuilding,
  FaRegHospital,
  FaSchool,
  FaChalkboardTeacher,
} from "react-icons/fa"; // Agrega más íconos

const CreateInstitutionForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<JSX.Element | null>(null); // Estado para el ícono seleccionado
  const [selectedIconId, setSelectedIconId] = useState<string>(""); // Estado para almacenar el ícono seleccionado
  const router = useRouter(); // Inicializar el hook de enrutamiento

  // Generar un slug basado en el nombre
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase() // Convertir todo a minúsculas
      .trim() // Eliminar espacios al inicio y al final
      .replace(/[\s]+/g, "-") // Reemplazar espacios internos por guiones
      .replace(/[^a-z0-9-]/g, ""); // Eliminar caracteres no permitidos (excepto letras, números y guiones)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !selectedIcon) {
      setError("Por favor, completa todos los campos y selecciona un ícono.");
      return;
    }

    const slug = generateSlug(name);
    if (!slug) {
      setError("El nombre proporcionado no es válido para una URL.");
      return;
    }

    const newInstitution: Institution = {
      id: slug, // Usar el slug como ID
      name,
      description,
      logo: selectedIconId, // Guardar el ícono seleccionado como logo
      schedule: "",
      subjects: [],
    };

    saveInstitution(newInstitution); // Guarda la institución en localStorage
    setName("");
    setDescription("");
    setError("");
    setSelectedIcon(null); // Limpiar el ícono seleccionado
    setSelectedIconId(""); // Limpiar el estado del ícono seleccionado

    // Redirigir al usuario a la página de la nueva institución
    router.push(`/institucion/${slug}`);
  };

  const handleIconClick = (icon: JSX.Element, iconId: string) => {
    setSelectedIcon(icon);
    setSelectedIconId(iconId); // Guardar el id del ícono seleccionado
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b1e24] p-6">
      <div className="max-w-lg w-full bg-[#222b39] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-white flex items-center mb-4">
          <FaUniversity className="mr-2 text-xl" /> Crear Nueva Institución
        </h1>
        {error && (
          <div className="flex items-center text-red-500 mb-4">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Nombre de la Institución
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 bg-[#1c2431] text-white border border-[#444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition"
              placeholder="Ingrese el nombre"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mt-2 bg-[#1c2431] text-white border border-[#444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] transition"
              placeholder="Ingrese una descripción"
            ></textarea>
          </div>

          {/* Selector de íconos */}
          <div className="mb-4">
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-white"
            >
              Selecciona un ícono
            </label>
            <div className="flex space-x-4 mt-2">
              <button
                type="button"
                onClick={() =>
                  handleIconClick(
                    <FaRegBuilding className="text-3xl" />,
                    "building"
                  )
                }
                className={`p-2 rounded-md transition ${
                  selectedIconId === "building"
                    ? "bg-[#14b8a6]"
                    : "bg-[#2d3b47]"
                } hover:bg-[#14b8a6]`}
              >
                <FaRegBuilding className="text-3xl" />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleIconClick(
                    <FaRegHospital className="text-3xl" />,
                    "hospital"
                  )
                }
                className={`p-2 rounded-md transition ${
                  selectedIconId === "hospital"
                    ? "bg-[#14b8a6]"
                    : "bg-[#2d3b47]"
                } hover:bg-[#14b8a6]`}
              >
                <FaRegHospital className="text-3xl" />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleIconClick(<FaSchool className="text-3xl" />, "school")
                }
                className={`p-2 rounded-md transition ${
                  selectedIconId === "school" ? "bg-[#14b8a6]" : "bg-[#2d3b47]"
                } hover:bg-[#14b8a6]`}
              >
                <FaSchool className="text-3xl" />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleIconClick(
                    <FaChalkboardTeacher className="text-3xl" />,
                    "chalkboard"
                  )
                }
                className={`p-2 rounded-md transition ${
                  selectedIconId === "chalkboard"
                    ? "bg-[#14b8a6]"
                    : "bg-[#2d3b47]"
                } hover:bg-[#14b8a6]`}
              >
                <FaChalkboardTeacher className="text-3xl" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#14b8a6] text-white p-3 rounded-md hover:bg-[#0d9488] transition duration-200"
          >
            Crear Institución
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInstitutionForm;
