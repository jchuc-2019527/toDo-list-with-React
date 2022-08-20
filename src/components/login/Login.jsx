import React, { useState } from "react";
import "./login.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import newTodo from  "../general/General"

const LogIn = () => {
  const authContext = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const { login, googleLogin, reset } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [errorC, setErrorC] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      navigate("/todo");
    } catch (error) {
      if (error.code == "auth/invalid-email" || "auth/invalid-password") {
        setError = alert("Correo o contraseña incorrecta");
      }
    }
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
    navigate("/todo");
  };

  const handleResetPassword = async () => {
    if (!user.email) return (setError = alert("Ingrese su correo"));
    try {
      await reset(user.email);
      setErrorC = alert("Se ha enviado un correo para restablecer su contraseña");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="login-box">
        <div className="left">
          <h1 className="log">Log In</h1>

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

          <input className="inpLogin" type="submit" name="signup_submit" value="Login" />
        </div>
        </form>
        <div>
        <div className="right">
          <span className="loginwith">
            Sign in with
            <br />
            social network
          </span>
          <button className="social-signin google" onClick={handleGoogleLogin}>
            Log in with Google
          </button>
          <button className="forgot" onClick={handleResetPassword}>
            Forgot password?
          </button>
        </div>
        </div>

        <div class="or">OR</div>
     
    </div>
  );
};

export default LogIn;
