import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import PasswordCounter from "./PasswordCounter"


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const usernameRef = useRef();

  const handleSubmit = async (event) => {
    try {
      if(username || password !== '', password.length > 7) {
        event.preventDefault();
        alert(`Thanks for signing up ${usernameRef.current.value}!`);
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
      <form className="bg-blue-400 h-screen flex items-center flex-col justify-center " onSubmit={handleSubmit}>
        <label className="username"> 
      <h3 className="text-center font-bold ">REGISTER</h3>
          <input
          className="my-3"
            id="username"
            type="text"
            placeholder="enter a username"
            ref={usernameRef}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label className="password" >
          <input
          className="my-3"
            type="password"
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
 
        <button className="text-lg bg-gray-600 rounded-full p-3 px-7 font-bold"  type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;