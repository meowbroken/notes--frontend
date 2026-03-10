import { PenSquareIcon, Trash2Icon, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(note._id);
  };

  return (
    <Link
      to={`/notes/${note._id}`}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-base-200/80 to-base-300/50 
        backdrop-blur-sm border border-base-content/10 hover:border-[#be4cc0]/50
        shadow-lg hover:shadow-[#be4cc0]/20 hover:shadow-2xl
        transition-all duration-300 hover:-translate-y-2"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#be4cc0] to-emerald-400" />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#be4cc0]/0 to-[#be4cc0]/0 
        group-hover:from-[#be4cc0]/5 group-hover:to-transparent transition-all duration-300" />
      
      <div className="relative p-5 flex flex-col h-full min-h-[180px]">
        <h3 className="text-base-content font-bold text-lg mb-2 line-clamp-1 
          group-hover:text-[#be4cc0] transition-colors duration-200">
          {note.title}
        </h3>
        
        <p className="text-base-content/60 text-sm line-clamp-3 flex-grow leading-relaxed">
          {note.content}
        </p>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-base-content/10">
          <div className="flex items-center gap-1.5 text-base-content/40">
            <Calendar className="size-3" />
            <span className="text-xs">
              {formatDate(new Date(note.createdAt))}
            </span>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 
            translate-y-2 group-hover:translate-y-0 transition-all duration-200">
            <Link
              to={`/edit/${note._id}`}
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-base-content/60 hover:text-[#da65de] 
                hover:bg-[#00FF9D]/10 transition-colors"
            >
              <PenSquareIcon className="size-4" />
            </Link>
            <button
              className="p-1.5 rounded-lg text-base-content/60 hover:text-error 
                hover:bg-error/10 transition-colors"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;