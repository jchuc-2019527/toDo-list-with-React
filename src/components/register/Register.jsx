import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const Register = ({ todo }) => {
  const authContext = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });



  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(user.email, user.password);
      navigate("/login");
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        setError = alert("El correo ya esta en uso");
      }
      if (error.code != "success") {
        setError = alert(
          "Correo o contraseña invalido (la contraseña debe de ser mayor a 6 caracteres)"
        );
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} id="login-box1">
        <div className="left1">
          <h1 className="sign">Sign up</h1>

          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
          <input type="submit" name="signup_submit" value="Sign me up" />
          <Link to="/login" className="lo">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
