import "./../styles/tutorialHome.css";
import tH from "../assets/tH.svg";

const TutorialHome = () => {
  return (
    <div className="tutorial-container">
      {/* Beginner Guided Tutorial */}
      <section className="tutorial-section">
        <div className="tutorial-content">
          <h1 className="tutorial-title">Beginner Guided <span>Tutorial</span></h1>
          <p className="tutorial-description">
            Learn how to use all of our basic tools with this guided introduction to the app. Helpful for beginners or anyone needing a quick refresher.
          </p>
          <button className="start-button">Start</button>
        </div>
        <img src={tH} alt="Beginner Guided Tutorial" className="tutorial-image" />
      </section>
    </div>
  );
};

export default TutorialHome;
