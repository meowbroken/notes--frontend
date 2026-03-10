import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import EditPage from './pages/EditPage';
import { useAuth } from './AuthContext.jsx';
import { Loader2 } from 'lucide-react';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#be4cc0]" />
      </div>
    );
  }

  return <Routes>
    <Route path="/" element={accessToken ? <HomePage /> : <Navigate to="/login" />} />
    <Route path="/login" element={accessToken ? <Navigate to="/" /> : <LoginPage />} />
    <Route path="/register" element={accessToken ? <Navigate to="/" /> : <RegisterPage />} />
    <Route path="/create" element={accessToken ? <CreatePage /> : <Navigate to="/login" />} /> 
    <Route path="/notes/:id" element={accessToken ? <NoteDetailPage /> : <Navigate to="/login" />} />
    <Route path="/edit/:id" element={accessToken ? <EditPage /> : <Navigate to="/login" />} />
    <Route path="*" element={<Navigate to="/" />} />  
  </Routes>;
};

export default App;