import { Student } from "@/types/Student";

interface StudentProps {
  student: Student;
  onMarkAttendance: (id: string) => void;
  onAddGrade: (id: string) => void;
}

const StudentCard: React.FC<StudentProps> = ({
  student,
  onMarkAttendance,
  onAddGrade,
}) => {
  return (
    <div className="student-card">
      <h4>{student.name}</h4>
      <button onClick={() => onMarkAttendance(student.id)}>
        Marcar Asistencia
      </button>
      <button onClick={() => onAddGrade(student.id)}>
        Agregar Calificación
      </button>
    </div>
  );
};

export default StudentCard;
