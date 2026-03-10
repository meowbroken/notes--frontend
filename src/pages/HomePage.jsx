import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import { useApiWithAuth } from "../useApiWithAuth";

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [, setLoading] = useState(false)
  const api = useApiWithAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (error) {
        console.error('Error fetching notes:', error)
        toast.error("Failed to fetch notes")
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [api])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      setNotes(notes.filter(note => note._id !== id))
    } catch (error) {
      toast.error("Failed to delete note")
      console.error('Error deleting note:', error)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {notes.map(note => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage