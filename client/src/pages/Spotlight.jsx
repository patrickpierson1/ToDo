import React, { useState, useEffect } from "react";
import "./../styles/Spotlight.css";

const Spotlight = ({ steps, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showTextBox, setShowTextBox] = useState(false);
  const [spotlightRect, setSpotlightRect] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [textBoxPosition, setTextBoxPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (steps.length > 0) {
      const selector = steps[currentStep].element;
      console.log("Looking for element with selector:", selector);

      if (typeof selector !== "string") {
        console.error("Selector is not a string:", selector);
        return;
      }

      const element = document.querySelector(selector);
      if (element) {
        console.log("Element found:", element);
        highlightElement(element);
      } else {
        console.log("Element not found. Retrying...");
        const retryInterval = setInterval(() => {
          const element = document.querySelector(selector);
          if (element) {
            console.log("Element found after retry:", element);
            clearInterval(retryInterval);
            highlightElement(element);
          }
        }, 100);                            // Check every 100ms
      }
    }
  }, [currentStep, steps]);

  const highlightElement = (element) => {
    const rect = element.getBoundingClientRect();
    setSpotlightRect({
      top: rect.top - 20,
      left: rect.left - 20,
      width: rect.width + 40,
      height: rect.height + 40,
    });

    setTextBoxPosition({
      top: rect.top - 40,                       // above the element
      left: rect.left + rect.width - 50,        // to the right
    });

    setShowSpotlight(true);
    setShowTextBox(true);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (onStepChange) {
        onStepChange(currentStep + 1);          // Notify the parent component of the step change
      }
    } else {
      setShowSpotlight(false);
      setShowTextBox(false);
      if (onStepChange) {
        onStepChange(currentStep + 1);          // Notify the parent component that the tutorial is complete
      }
    }
  };

  return (
    <>
      {/* Spotlight Overlay */}
      <div
        className="spotlight-overlay"
        style={{
          display: showSpotlight ? "block" : "none",
          maskImage: `radial-gradient(ellipse at ${spotlightRect.left + spotlightRect.width / 2}px ${spotlightRect.top + spotlightRect.height / 2}px, transparent 0%, transparent ${spotlightRect.width / 2}px ${spotlightRect.height / 2}px, rgba(0, 0, 0, 1) ${spotlightRect.width + 20}px ${spotlightRect.height + 20}px, black 100%)`,
          WebkitMaskImage: `radial-gradient(ellipse at ${spotlightRect.left + spotlightRect.width / 2}px ${spotlightRect.top + spotlightRect.height / 2}px, transparent 0%, transparent ${spotlightRect.width / 2}px ${spotlightRect.height / 2}px, rgba(0, 0, 0, 1) ${spotlightRect.width + 20}px ${spotlightRect.height + 20}px, black 100%)`,
        }}
      ></div>

      {/* Spotlight Text Box */}
      {steps[currentStep] && (
        <div
          className="spotlight-text-box"
          style={{
            display: showTextBox ? "block" : "none",
            top: `${textBoxPosition.top}px`,
            left: `${textBoxPosition.left}px`,
          }}
          onClick={handleNextStep}
        >
          <div className="spotlight-header">{steps[currentStep].header}</div>
          <div className="spotlight-footer feature-button">
            {currentStep < steps.length - 1 ? "What else?" : "Got it!"}
          </div>
        </div>
      )}
    </>
  );
};

export default Spotlight;