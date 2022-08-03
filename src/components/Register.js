import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import PasswordCounter from "./PasswordCounter"


const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [token, setToken] = [props.token, props.setToken]
  const usernameRef = useRef();

  const handleSubmit = async (event) => {
    try {
      if(username || password !== '', password.length > 7) {
        event.preventDefault();
        alert(`Thanks for signing up${usernameRef.current.value}!`);
      const token = await registerUser(username, password);
      localStorage.setItem("token", token);
      navigate("/routines");
      }else {
        alert("Please enter a Username and Password!")
      }
     } catch (error) {
      alert(error);
    }
  
  };

  return (
    <div className="box" id="loginBox">
      <h3>REGISTER</h3>
      <form onSubmit={handleSubmit}>
        <label className="username">
          UserName: 
          <input
            id="username"
            type="text"
            placeholder="enter a username"
            ref={usernameRef}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label className="password" >
          Password: 
          <input
            type="password"
            placeholder="enter a password (8 character min)"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
 
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;