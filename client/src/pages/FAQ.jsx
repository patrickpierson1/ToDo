import React, { useState } from "react";
import "../styles/FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "I am getting an error when I try to log in with Google for the first time. What do I do?",
      answer: "You need to first use the Sign Up page to create an account with Google before logging in.",
    },
    {
      question: "How do I save my note? The button does not work.",
      answer: "We are working on having user notes saved on the site, but for now please press the Export button to save your file locally as a pdf.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked <span>Questions</span></h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={`faq-icon ${openIndex === index ? "rotate" : ""}`}>&#9660;</span>
            </button>
            <div className="faq-answer">{openIndex === index && <p>{faq.answer}</p>}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
