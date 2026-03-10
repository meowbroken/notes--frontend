import { ArrowLeftIcon, Edit, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/notes/${id}`, {
        title,
        content,
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
      console.error("Error saving note:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6 gap-2">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter note title"
                    className="input input-bordered w-full focus:input-primary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full h-40 focus:textarea-primary resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-end mt-6">
                  <Link to="/" className="btn btn-ghost">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary gap-2"
                    disabled={loading || !title.trim() || !content.trim()}
                  >
                    {loading && <Loader2 className="size-4 animate-spin" />}
                    {loading ? "Saving..." : "Save Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;