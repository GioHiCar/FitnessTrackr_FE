import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
      <nav >
        <h1 className="text-3xl">Fitness Trackr</h1>
        <div className="flex justify-center bg-zinc-300 ">
          <NavLink to="/" className="mx-8 text-2xl hover:bg-stone-500 rounded hover:text-white ">
            Sign in/Sign Up  
          </NavLink>
          <NavLink to="/routines" className="mx-8 text-2xl hover:bg-stone-500 rounded hover:text-white ">
            Routines
          </NavLink>
          <NavLink to="/users/:username/routines" className="mx-8 text-2xl hover:bg-stone-500 rounded hover:text-white ">
            My Routines
          </NavLink>
          <NavLink to="/activities" className="mx-8 text-2xl hover:bg-stone-500 rounded hover:text-white ">
            Activities
          </NavLink>
        </div>
      </nav>

  );
};

export default Navbar;