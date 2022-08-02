import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";


const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = [props.token, props.setToken]
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await registerUser(username, password);
    localStorage.setItem("token", token);
  };

  return (
    <div className="box" id="loginBox">
      <h3>REGISTER</h3>
      <form onSubmit={handleSubmit}>
        <label className="username">
          UserName: {}
          <input
            type="text"
            value={username}
            placeholder="enter a username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>

        <label className="password" >
          Password: {}
          <input
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;