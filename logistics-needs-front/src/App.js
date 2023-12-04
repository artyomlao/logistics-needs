import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ProcurementView from "./ProcurementView";
import { useLocalState } from "./util/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [role, setRole] = useState(getRolesFromJWT());

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJwt = jwtDecode(jwt);
      return decodedJwt.role;
    }
    return [];
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          role === "ADMIN" ? (
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/procurement/:id"
        element={
          <PrivateRoute>
            <ProcurementView />
          </PrivateRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
