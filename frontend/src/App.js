import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SoilList from "./pages/SoilList";
import DistributorList from "./pages/DistributorList";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10 }}>
        <Link to="/">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/soils">Soils</Link> |{" "}
        <Link to="/distributors">Distributors</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/soils" element={<SoilList />} />
        <Route path="/distributors" element={<DistributorList />} />
      </Routes>
    </BrowserRouter>
  );
}
