import { Note } from "@/types/Note";

interface NoteProps {
  note: Note;
  onDelete: () => void;
}

const NoteComponent: React.FC<NoteProps> = ({ note, onDelete }) => {
  return (
    <div className="note-card">
      <p>{note.content}</p>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default NoteComponent;
