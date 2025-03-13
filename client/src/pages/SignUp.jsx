import "./../styles/login.css";
import SignUpImage from "../assets/signup.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [favColor, setFavColor] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [vis, setVis] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      // Save user details locally
      const newUser = { username, favColor, password };
      localStorage.setItem("user", JSON.stringify(newUser)); // Store user data
      localStorage.setItem("isLoggedIn", "false"); // Ensure they login manually
  
      // Redirect to login page after sign up
      navigate("/login");  
    } catch (err) {
      setError("Something went wrong.");
    }
  };
  

  return (
    <div className="login-container">
      <img src={SignUpImage} alt="Sign Up Illustration" className="login-image" />
      <div className="login-form">
        <h1 className="login-header">Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="login-label">Username</label>
          <input type="text" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label className="login-label">Favorite Color</label>
          <input type="text" className="login-input" value={favColor} onChange={(e) => setFavColor(e.target.value)} required />

          <label className="login-label">Password</label>
          <input type={vis} className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label className="login-label">Confirm Password</label>
          <input type={vis} className="login-input" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />

          <input type="checkbox" onChange={() => setVis(vis === "password" ? "text" : "password")} />
          <label> Show Password </label>

          <button type="submit" className="login-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
