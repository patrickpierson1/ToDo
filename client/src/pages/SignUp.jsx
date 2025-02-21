import "./../styles/login.css";
import SignUpImage from "../assets/signup.png";
import { useState } from "react";
import React from "react";

const SignUp = () => {
    return (
        <div>
            <div className="login-container">
                {/* Left Side - Image */}
                <img src={SignUpImage} alt="Sign Up Illustration" className="login-image" />

                {/* Right Side - Login Form */}
                <div className="login-form">
                    <h1 className="login-header">Sign Up</h1>

                    <label className="login-label">Username</label>
                    <input type="text" className="login-input" placeholder="username" />

                    <label className="login-label">Password</label>
                    <input type="text" className="login-input" placeholder="password" />

                    <label className="login-label">Confirm Password</label>
                    <input type="text" className="login-input" placeholder="password" />

                    {/* Submit Button */}
                    <button className="login-button">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
