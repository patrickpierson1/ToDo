import "./../styles/login.css";
import LoginImage from "../assets/login.png";
import { useState } from "react";
import React from "react";

const Login = () => {
    return (
        <div>
            <div className="login-container">
                {/* Left Side - Image */}
                <img src={LoginImage} alt="Login Illustration" className="login-image" />

                {/* Right Side - Login Form */}
                <div className="login-form">
                    <h1 className="login-header">Log In</h1>

                    <label className="login-label">Username</label>
                    <input type="text" className="login-input" placeholder="username" />

                    <label className="login-label">Password</label>
                    <input type="text" className="login-input" placeholder="password" />

                    {/* Submit Button */}
                    <button className="login-button">Log In</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
