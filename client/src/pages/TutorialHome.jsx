import React, { useState } from "react";
import "./../styles/tutorialHome.css";
import tH from "../assets/tH.svg";
import Spotlight from "./Spotlight";
import { useNavigate } from "react-router-dom";

const TutorialHome = () => {
  const [showSpotlight, setShowSpotlight] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const steps = [
    {
      element: ".tutorial-image",
      header: "Click here to begin the tutorial!",
      footer: "Let's go!",
      onNext: () => {
        navigate("/"); // Navigate to the Home page
      },
    },
  ];

  const handleStartClick = () => {
    setShowSpotlight(true); // Show the spotlight
  };

  return (
    <div className="tutorial-container">
      {showSpotlight && (
        <Spotlight
          steps={steps}
          onStepChange={() => setShowSpotlight(false)} // Hide spotlight after completion
        />
      )}

      <section className="tutorial-section">
        <div className="tutorial-content">
          <h1 className="tutorial-title">
            Beginner Guided <span>Tutorial</span>
          </h1>
          <p className="tutorial-description">
            Learn how to use all of our basic tools with this guided introduction to the app. Helpful for beginners or anyone needing a quick refresher.
          </p>
          <button className="start-button" onClick={handleStartClick}>
            Start
          </button>
        </div>
        <img src={tH} alt="Beginner Guided Tutorial" className="tutorial-image" />
      </section>
    </div>
  );
};

export default TutorialHome;