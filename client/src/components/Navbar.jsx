import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-16 py-6 bg-white shadow-md">
      <div className="flex space-x-8">
        <Link to="/" className="text-slate-900 text-base font-semibold">
          Home
        </Link>
        <Link to="/tutorial-home" className="text-slate-900 text-base font-semibold">
          Tutorial Home
        </Link>
        <Link to="/contact" className="text-slate-900 text-base font-semibold">
          Contact
        </Link>
      </div>
      <div className="flex space-x-5">
        <Link to="/login" className="px-4 py-2 border border-indigo-500 text-indigo-500 text-sm font-semibold rounded">
          Log In
        </Link>
        <Link to="/signup" className="px-4 py-2 bg-black text-white text-sm font-semibold rounded">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
