import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Favorite Color:</strong> {user.favColor}</p>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default Profile;
