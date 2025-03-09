import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Contact from "../pages/Contact";
import TutorialHome from "../pages/TutorialHome";
import NotesHome from "../pages/NotesHome";
import Note from "../pages/Note";
import LoggedInHome from "../pages/LoggedInHome";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<ProtectedRoute><LoggedInHome /></ProtectedRoute>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tutorial-home" element={<TutorialHome />} />
      <Route path="/noteshome" element={<NotesHome />} />
      <Route path="/note" element={<Note />} />
    </Routes>
  );
};

export default AppRoutes;
