import "./../styles/login.css";
import LoginImage from "../assets/login.png";
import { useState } from "react";
import React from "react";
import { GoogleLogin } from '@react-oauth/google'

const Login = () => {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[vis, setVis] = useState('password');
  
  const handleSubmit = (e)=> {
    console.log(username, password);
  }

  const handleGSignin = (e) => {
      const credential = jwtDecode(e.credential);
      let firstName = credential.given_name;
      let lastName = credential.family_name;
      let imgUrl = credential.picture;
      let email = credential.email;
      console.log(profile);
    }

    return (
        <div>
            <div className="login-container">
                {/* Left Side - Image */}
                <img src={LoginImage} alt="Login Illustration" className="login-image" />

                {/* Right Side - Login Form */}
                <div className="login-form">
                    <h1 className="login-header">Log In</h1>

                    <label className="login-label">Username</label>
                    <input type="text" className="login-input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label className="login-label">Password</label>
                    <input type={vis} className="login-input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    
                    <input type="checkbox" name="show" onChange={(e) => {setVis(vis == "password" ? "text":"password")}}/>
                    <label> Show Password </label>
                    <br></br>

                    {/* Submit Button */}
                    <button className="login-button" onClick={handleSubmit}>Log In</button>
                    <div className="signinDivider"><span>or</span></div>
                    <GoogleLogin onSuccess={handleGSignin} onError={() => console.log("Login Failed")}/>
                </div>
            </div>
        </div>
    );
};

export default Login;
