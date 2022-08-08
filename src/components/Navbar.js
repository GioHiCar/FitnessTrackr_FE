import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <nav>
      <h1 className="nav-title">Fitness Trackr</h1>
      <div className="nav-links">
        <NavLink to="/" className="post-link">
          Sign in/Sign Up
        </NavLink>
        <NavLink to="/routines" className="routines-link">
          Routines
        </NavLink>
        <NavLink to="/users/:username/routines" className="myRoutines-link">
          My Routines
        </NavLink>
        <NavLink to="/activities" className="activities-link">
          Activities
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;