import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LocationDashboard from "./pages/LocationDash";
import FoodDashboard from "./pages/FoodDash";
import SoundDashboard from "./pages/SoundDash";
import DecorationDashboard from "./pages/DecorationDash";
import InviteDashboard from "./pages/InviteDash";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/locations" element={<LocationDashboard />} />
            <Route path="/foods" element={<FoodDashboard />} />
            <Route path="/sounds" element={<SoundDashboard />} />
            <Route path="/decorations" element={<DecorationDashboard />} />
            <Route path="/invites" element={<InviteDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
