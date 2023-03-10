import "./Login.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import React from "react";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const {storedToken, authenticateUser} = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    const requestBody = { email, password };

     // Send a request to the server using axios
      
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          requestBody,{ headers: { Authorization: `Bearer ${storedToken}` },
        }
        )
        localStorage.setItem("authToken", response.data.authToken);
        authenticateUser();
  
  
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

 
  

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="email">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div> 
  ); 
}

export default Login;
