// src/App.jsx
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import CreateProfile from "./pages/CreateProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import EditProfile from "./pages/EditProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext} from "./context/AuthContext";

function App() {
   const { currentUser } = useAuthContext();
   
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes (need authentication) */}
        <Route path="/create" element={<PrivateRoute />}>
          <Route index element={<CreateProfile />} />
        </Route>

        <Route path="/profiles/:id/edit" element={<PrivateRoute />}>
          <Route index element={<EditProfile />} />
        </Route>
      </Routes>

      {/* If authenticated and has no profile, show button to create profile
      {currentUser && !currentUser?.hasProfile && (
        <Link to="/create" className="bg-green-500 p-2">
          Create Your Profile
        </Link>)
      } */}
    </Router>
  )
}

export default App;
