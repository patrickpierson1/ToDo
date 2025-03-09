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
      const response = await fetch("http://342.yonkers.dev:5000/api/auth/signup",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, favColor, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Sign up failed.");
        return;
      }

      localStorage.setItem("token", data.token);

      // redirect to logged in page once signed in
      navigate("/dashboard");
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
