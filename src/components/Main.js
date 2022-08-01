import React, { useState } from "react";
import { Test, Navbar, Activities, MyRoutines, Routines, Home, Register } from './';
import { Routes, Route } from "react-router-dom";


const Main = () => {
  const [token, setToken] = useState("");
return(
  <div>
    <div>
        <Navbar />
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/routines" element={<Routines />} />
      <Route
            path="/register"
            element={<Register token={token} setToken={setToken} />}
          />
    </Routes>
</div>
)}

export default Main;
