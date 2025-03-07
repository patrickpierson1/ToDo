import "./../styles/login.css";
import SignUpImage from "../assets/signup.png";
import { useState } from "react";
import React from "react";

const SignUp = () => {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[confirmPass, setConfirmPass] = useState('');
  const[vis, setVis] = useState('password');
  

  const handleSubmit = (e) => {
    console.log(username, password, confirmPass);
  }

    return (
        <div>
            <div className="login-container">
                {/* Left Side - Image */}
                <img src={SignUpImage} alt="Sign Up Illustration" className="login-image" />

                {/* Right Side - Login Form */}
                <div className="login-form">
                    <h1 className="login-header">Sign Up</h1>

                    <label className="login-label">Username</label>
                    <input type="text" className="login-input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label className="login-label">Password</label>
                    <input type={vis} className="login-input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label className="login-label">Confirm Password</label>
                    <input type={vis} className="login-input" placeholder="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />

                    <input type="checkbox" name="show" onChange={(e) => {setVis(vis == "password" ? "text":"password")}}/>
                    <label> Show Password </label>


                    {/* Submit Button */}
                    <button className="login-button">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
