import React, { useState} from "react";
import { userLogin } from "../api";
import { Link, useNavigate } from "react-router-dom";
import handleLogout from "./LogOut";



const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const token = await userLogin(username, password);
      localStorage.setItem("token", token);
      navigate("/routines");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          Welcome!
          <Link to="/home/posts">View Posts</Link>
          <button onClick={handleLogout} >Log Out</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
        <h3>Log in</h3>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            placeholder="enter a username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              value={password}
              placeholder="enter a password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <div>
            <Link to="/register">Create Account</Link>
          </div>
        </form>
      )}
    </>
  );
};
export default Home;
