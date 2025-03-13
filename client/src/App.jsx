import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; 
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar"; 
import './App.css';

function App() {
  return (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter> 
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  </GoogleOAuthProvider>
  );
}

export default App;
