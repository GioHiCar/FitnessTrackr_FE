import React, { useState} from "react";
import { userLogin } from "../api";
import { Link, useNavigate } from "react-router-dom";
import handleLogout from "./LogOut";
import '../input.css'



const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      if(username || password !== '' , password.length > 7 ) {
      event.preventDefault();
      const token = await userLogin(username, password);
      localStorage.setItem("token", token);
      navigate("/routines");
       }else {
        alert("Please enter a Username or Password!")
       }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-500" >
      {localStorage.getItem("token") ? (
        <div>
          <button onClick={handleLogout} >Log Out</button>
        </div>
      ) : (
        <form  className="bg-blue-400 h-screen flex items-center flex-col justify-center " onSubmit={handleSubmit}>
        <h3 className="font-bold">Log in</h3>
          <label htmlFor="username"> </label>
          <input
          className="my-3"
            type="text"
            value={username}
            placeholder="enter a username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div >
            <label className="content-center"> </label>
            <input
            className="my-3"
              type="password"
              value={password}
              placeholder="enter a password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button  type="submit" className="text-lg bg-gray-600 rounded-full p-3 px-7 font-bold hover:text-white" >Login</button>
          <div className="absolute bottom-10">
           Don't have an account yet? Click  <Link to="/register" className="hover:bg-stone-300 rounded underline underline-offset-2" >HERE</Link> to create one!
          </div>
        </form>
      )}
    </div>
  );
};
export default Home;
