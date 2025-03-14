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
    const checkAuthStatus = async () => {
    	try {
    		const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/status", {
    			credentials: "include",
    		});
    		const data = await res.json();
    		if (res.ok && data.user) {
    			navigate("/");
    		}
    	} catch (error) {
    		console.error("Auth check failed", error);
    	}
    };
    checkAuthStatus();
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

  const handleGoogleSignIn = async (response) => {
	try {
		const decoded = jwtDecode(response.credential);
		console.log("Google Login Success:", decoded);

		// preparing the user data
		const googleUser = {
			googleId: decoded.sub,
			username: decoded.name,
			email: decoded.email,
			profilePic: decoded.picture,
			};
		// send data to backend API
		const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/google/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(googleUser)
		});

		if (!res.ok) {
			console.error("Failed to auth with google");
			setError("google Login Failed");
			return;
		}
		const userData = await res.json();
		console.log("User authenticated:", userData);

		//store session info locally
		localStorage.setItem("user", JSON.stringify(userData.user));
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
	    onSuccess={handleGoogleSignIn} 
	    onError={() => setError("Google Login Failed")} />
        </div>
      </div>
    </div>
  );
};

export default Login;
