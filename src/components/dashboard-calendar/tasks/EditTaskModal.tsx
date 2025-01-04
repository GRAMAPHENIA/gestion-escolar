import React, { useState, useEffect, useRef, useCallback } from "react";
import { Task } from "@/types/task";
import { TagInput } from "@/components/dashboard-calendar/AddTaskForm/TagInput";
import Image from "next/image";
import UploadPhoto from "../icons/UploadPhoto";

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClasses =
    "w-full p-2 mb-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none";

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
      setPreviewPhoto(task.photoUrl || null);
    }
  }, [task]);

  // Usamos useCallback para estabilizar la función onClose
  const stableOnClose = useCallback(onClose, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") stableOnClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Desactiva el scroll de la página cuando el modal está abierto
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Restaura el scroll al cerrar el modal
    };
  }, [isOpen, stableOnClose]); // Aquí usamos stableOnClose

  if (!isOpen || !editedTask) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev!, [name]: value }));
  };

  const handleTagsChange: React.Dispatch<React.SetStateAction<string[]>> = (
    newTags
  ) => {
    setEditedTask((prev) => ({
      ...prev!,
      tags: typeof newTags === "function" ? newTags(prev!.tags) : newTags,
    }));
  };

  const handleSave = () => {
    if (!editedTask?.title.trim()) {
      alert("El título no puede estar vacío.");
      return;
    }
    onSave({ ...editedTask, photoUrl: previewPhoto });
    stableOnClose();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-950 bg-opacity-80 backdrop-blur-2xl flex justify-center items-center z-50"
      role="dialog"
      aria-labelledby="edit-task-title"
      aria-modal="true"
    >
      <div
        className="bg-gray-800 p-6 rounded-lg w-full max-w-lg max-h-screen overflow-y-auto shadow-md border border-slate-700"
      >
        <h2
          id="edit-task-title"
          className="text-xl font-bold mb-4 text-blue-400"
        >
          Editar Tarea
        </h2>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          className={inputClasses}
        />
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          className={inputClasses}
          rows={3}
        />
        <TagInput tags={editedTask.tags} setTags={handleTagsChange} />

        {/* Sección para subir y mostrar la imagen */}
        <div className="mt-4">
          <label
            htmlFor="photo-reupload"
            className="flex flex-col items-center justify-center w-full text-center cursor-pointer text-blue-400 bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg shadow-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
          >
            <UploadPhoto />
            Cambiar Foto
          </label>
          <input
            id="photo-reupload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            ref={fileInputRef}
          />
        </div>

        {previewPhoto && (
          <Image
            width={300}
            height={300}
            src={previewPhoto}
            alt="Vista previa de la imagen"
            className="mt-4 w-full h-32 object-cover rounded-lg"
          />
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={stableOnClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:outline-none mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
