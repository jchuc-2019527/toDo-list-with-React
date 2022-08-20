import React from "react";
import "./navBar.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

const NavBar = () => {

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logout();
    navigate("/todo");
  };
  if (loading) return <h1>LOADING...</h1>;

  return (
    <div>
      <nav>
        <ul>
          <span className="span">
            HOLA DE NUEVO: <br />
            <span className="email">{user.email} </span>
          </span>
          <button onClick={handleLogOut} className="hola">
            <li className="a">LogOut</li>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
