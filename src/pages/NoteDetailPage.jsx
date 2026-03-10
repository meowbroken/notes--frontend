import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, PenSquareIcon, Trash2Icon, Calendar, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
      } finally {
        setFetching(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#00FF9D]" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-base-content/60">Note not found</p>
        <Link to="/" className="btn btn-ghost gap-2">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6 gap-2 text-base-content/70 hover:text-[#00FF9D]">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-base-200/80 to-base-300/50 
            backdrop-blur-sm border border-base-content/10 shadow-lg">
            
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF9D] to-emerald-400" />

            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
                  {note.title}
                </h1>
                
                <div className="flex items-center gap-2">
                  <Link
                    to={`/edit/${id}`}
                    className="p-2 rounded-lg text-base-content/60 hover:text-[#00FF9D] 
                      hover:bg-[#00FF9D]/10 transition-colors"
                  >
                    <PenSquareIcon className="size-5" />
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="p-2 rounded-lg text-base-content/60 hover:text-error 
                      hover:bg-error/10 transition-colors disabled:opacity-50"
                  >
                    {deleting ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <Trash2Icon className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-base-content/40 mb-6 pb-4 border-b border-base-content/10">
                <Calendar className="size-4" />
                <span className="text-sm">
                  {formatDate(new Date(note.createdAt))}
                </span>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base-content/80 whitespace-pre-wrap leading-relaxed">
                  {note.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;