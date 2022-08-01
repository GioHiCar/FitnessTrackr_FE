import React from "react";
import { NavLink } from "react-router-dom";
// import { Logout } from "./";

const Navbar = () => {
  return (
    <nav>
      <h1 className="nav-title">Fitness Trackr</h1>
      <div className="nav-links">
        <NavLink to="/" className="post-link">
          Home
        </NavLink>
        <NavLink to="/routines" className="routines-link">
          Routines
        </NavLink>
        <NavLink to="/myRoutines" className="myRoutines-link">
          My Routines
        </NavLink>
        <NavLink to="/activities" className="activities-link">
          Activities
        </NavLink>
        <NavLink to="/login-and-register" className="login-register-link">
          Login/Register
        </NavLink>
        {/* {localStorage.getItem("token") ? <Logout /> : null} */}
      </div>
    </nav>
  );
};

export default Navbar;