import "./../styles/home.css";
import {Link} from "react-router-dom";
import HomeIcon1 from "../assets/homeicon1.svg";
import HomeIcon2 from "../assets/homeicon2.svg";
import HomeIcon3 from "../assets/homeicon3.svg";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero">
        <img src={HomeIcon1} alt="Home Icon" className="home-icon" />
        <div className="hero-content">
          <h1 className="hero-title">
            Never Forget A Task <span>Again</span>
          </h1>
          <p className="hero-subtitle">
            Stay on track with a new way to take simple yet creative notes that incorporate deadlines, task tracking, and more.
          </p>
          <Link className="cta-button" to="/tutorial-home">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        {/* Image and Text Side by Side */}
        <div className="feature">
          <img src={HomeIcon2} alt="Take Notes Icon" className="additional-icon" />
          <div className="feature-card">
            <h2 className="feature-title">Take notes in style</h2>
            <p className="feature-description">
              Learn how to take useful, yet visually appealing notes, while keeping track of important deadlines and tasks along the way.
            </p>
            <Link className="feature-button" to="/tutorial-home">Add First Task</Link>
          </div>
        </div>

        <div className="feature">
          <img src={HomeIcon3} alt="Explore Examples Icon" className="additional-icon" />
          <div className="feature-card">
            <h2 className="feature-title">Explore user-created examples</h2>
            <p className="feature-description">
              These are examples that some of our users have decided to publish to help inspire your note-taking.
            </p>
            <Link className="feature-button" to="/examples">View Examples</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
