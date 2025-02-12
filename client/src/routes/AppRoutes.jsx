import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Contact from "../pages/Contact";
import TutorialHome from "../pages/TutorialHome";
import NotesHome from "../pages/NotesHome";
import Note from "../pages/Note";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tutorialhome" element={<TutorialHome />} />
      <Route path="/noteshome" element={<NotesHome />} />
      <Route path="/note" element={<Note />} />
    </Routes>
  );
};

export default AppRoutes;
