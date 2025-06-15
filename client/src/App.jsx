// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/u/:username" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Router>
  )
}

export default App;
