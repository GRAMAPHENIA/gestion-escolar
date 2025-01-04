import Image from "next/image";
import { Institution } from "@/types/institutions";

interface InstitutionCardProps {
  institution: Institution;
  onEdit: () => void;
  onDelete: () => void;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({
  institution,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="institution-card">
      <Image src={institution.logo} alt={institution.name} />
      <h3>{institution.name}</h3>
      <p>Horario: {institution.schedule}</p>
      <p>Materias: {institution.subjects.join(", ")}</p>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default InstitutionCard;
