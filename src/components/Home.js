import React, { useState} from "react";
import { userLogin } from "../api";
import { Link } from "react-router-dom";
import handleLogout from "./LogOut";
// import './styles.css'

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const token = await userLogin(username, password);
      localStorage.setItem("token", token);
      console.log(token);
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
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
