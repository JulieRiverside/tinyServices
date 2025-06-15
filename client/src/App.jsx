// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import CreateProfile from "./pages/CreateProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles/:username" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateProfile />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App;
