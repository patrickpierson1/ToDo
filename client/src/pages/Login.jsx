import "./../styles/login.css";
import LoginImage from "../assets/login.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vis, setVis] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");  // Redirect if already logged in
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    // Retrieve stored user from signup
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
      setError("Invalid credentials");
      return;
    }

    // Store login state
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to home and force Navbar update
    window.location.href = "/";
  };

  const handleGoogleSignIn = (response) => {
	try {
		const decoded = jwtDecode(response.credential);
		console.log("Google Login Success:", decoded);

		// store user details locally
		const googleUser = {
			username: decoded.name,
			email: decoded.email,
			profilePic: decoded.picture,
			};
		localStorage.setItem("user", JSON.stringify(googleUser));
		localStorage.setItem("isLoggedIn", "true");
		// redir to home
		window.location.href = "/";
	      } catch (error) {
		console.error("Google sign-ign error:", error);
		setError("Google AUTH Failed!");
	      }
	  };

  return (
    <div>
      <div className="login-container">
        {/* Left Side - Image */}
        <img src={LoginImage} alt="Login Illustration" className="login-image" />

        {/* Right Side - Login Form */}
        <div className="login-form">
          <h1 className="login-header">Log In</h1>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label className="login-label">Username</label>
            <input 
              type="text" 
              className="login-input" 
              placeholder="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />

            <label className="login-label">Password</label>
            <input 
              type={vis} 
              className="login-input" 
              placeholder="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />

            <input 
              type="checkbox" 
              onChange={() => setVis(vis === "password" ? "text" : "password")} 
            />
            <label> Show Password </label>

            {/* Submit Button */}
            <button type="submit" className="login-button">Log In</button>
          </form>

	  {/* Divider */}
	  <div className="signinDivider"><span>or</span></div>

	  { /* Google Login Button */}
	  <GoogleLogin
		clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
	    onSuccess={handleGoogleSignIn} 
	    onError={() => setError("Google Login Failed")} />
        </div>
      </div>
    </div>
  );
};

export default Login;
