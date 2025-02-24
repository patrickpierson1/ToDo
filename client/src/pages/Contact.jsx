import "./../styles/contact.css";
import ContactImage from "../assets/cont.svg";
import { useState } from "react";

const Contact = () => {
  // Country code state
  const [countryCode, setCountryCode] = useState("US");
  const [phoneNumber, setPhoneNumber] = useState("");

  // List of countries with codes
  const countryCodes = [
    { code: "US", label: "+1" },
    { code: "CA", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "AU", label: "+61" },
    { code: "IN", label: "+91" },
    { code: "FR", label: "+33" },
    { code: "DE", label: "+49" },
    { code: "JP", label: "+81" },
    { code: "CN", label: "+86" },
    { code: "BR", label: "+55" }
  ];

  return (
    <div className="contact-container">
      {/* Left Side - Contact Form */}
      <div className="contact-form">
        <div className="contact-header">
          <h1 className="contact-subtitle">Get in touch</h1>
          <p className="contact-description">
            Please fill out this form if you need help or have a recommendation.
          </p>
        </div>

        <label className="contact-label">First name</label>
        <input type="text" className="contact-input" placeholder="First name" />

        <label className="contact-label">Last name</label>
        <input type="text" className="contact-input" placeholder="Last name" />

        <label className="contact-label">Email</label>
        <input type="email" className="contact-input" placeholder="you@company.com" />

        <label className="contact-label">Phone number</label>
        <div className="phone-container">
          {/* Country Code Dropdown */}
          <select
            className="phone-left"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label} {country.code}
              </option>
            ))}
          </select>

          {/* Phone Number Input */}
          <input
            type="tel"
            className="phone-right"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Message Field */}
        <label className="contact-label">Message</label>
        <textarea className="contact-message" placeholder="Write your message here..."></textarea>

        {/* Privacy Policy Section */}
        <div className="privacy-container">
          <input type="checkbox" className="privacy-checkbox" />
          <p className="privacy-text">
            You agree to our friendly <span className="privacy-policy">privacy policy</span>.
          </p>
        </div>

        {/* Submit Button */}
        <button className="contact-button">Send message</button>
      </div>

      {/* Right Side - Image */}
      <img src={ContactImage} alt="Contact Illustration" className="contact-image" />
    </div>
  );
};

export default Contact;
