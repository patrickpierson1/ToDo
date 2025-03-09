import { Link } from "react-router-dom";
import "../components/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tutorial-home">Tutorial Home</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="nav-actions">
        <Link to="/login" className="login-btn">Log In</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
