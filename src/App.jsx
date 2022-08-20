import React from "react";
import "./App.css";
import General from "./components/general/General";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NotFound from "./components/notFound/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/protected/Protected";

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <General />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
