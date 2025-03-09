import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoggedInHome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    } else {
      fetch("http://342.yonkers.dev:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch(() => navigate("/login")); // Redirect on error
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.username}!</h1>
      <p>Your favorite color: {user.favColor}</p>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
        Log Out
      </button>
    </div>
  );
};

export default LoggedInHome;
