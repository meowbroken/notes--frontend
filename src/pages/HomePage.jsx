import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import NoteCard from '../components/NoteCard'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes")
        setNotes(res.data);
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`)
      setNotes(notes.filter(note => note._id !== id))
    } catch (error) {
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