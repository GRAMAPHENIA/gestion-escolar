import { Class } from "@/types/Class";

interface ClassProps {
  classData: Class;
  onEdit: () => void;
  onDelete: () => void;
}

const ClassComponent: React.FC<ClassProps> = ({
  classData,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="class-card">
      <h4>{classData.title}</h4>
      <p>{classData.time}</p>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default ClassComponent;
