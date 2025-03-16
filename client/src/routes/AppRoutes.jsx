import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Contact from "../pages/Contact";
import TutorialHome from "../pages/TutorialHome";
import NotesHome from "../pages/NotesHome";
import Note from "../pages/Note";
import Profile from "../pages/Profile";
import Examples from "../pages/Examples";
import FAQ from "../pages/FAQ";
const ProtectedRoute = ({ children }) => {
  return children; // No need to check authentication
};


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tutorial-home" element={<TutorialHome />} />
      <Route path="/noteshome" element={<NotesHome />} />
      <Route path="/note" element={<Note />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/examples" element={<Examples />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
};

export default AppRoutes;
