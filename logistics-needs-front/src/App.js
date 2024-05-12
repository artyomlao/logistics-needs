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
import Registration from "./Registration";
import AdminUsersPage from "./AdminUsersPage";
import { useLocalState } from "./util/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNavbar from "./TopNavbar";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [role, setRole] = useState(getRolesFromJWT());

    const handleLogout = () => {
        setJwt(null);
        window.location.href = "/login";
    };

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
                    <TopNavbar handleLogout={handleLogout} />
                    {/* Ваш остальной JSX здесь */}
              <AdminDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
                <TopNavbar handleLogout={handleLogout} />
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <AdminUsersPage />
          </PrivateRoute>
        }>
      </Route>
      <Route
        path="/procurement/:id"
        element={
          <PrivateRoute>
            <ProcurementView />
          </PrivateRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
