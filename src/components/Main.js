import React, { useState } from "react";
import { Test, Navbar, Activities, MyRoutines, Routines, Home, Register, EditRoutine } from './';
import { Routes, Route } from "react-router-dom";
import { ValidUser} from "../api";


const Main =  () => {
  const [token, setToken] = useState("");
return(
  <div>
    <div>
        <Navbar />
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/routines" element={<Routines />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/users/:username/routines" element={<MyRoutines  />} />
      <Route path="/register" element={<Register token={token} setToken={setToken} />}/>
      <Route path="/EditRoutine" element={<EditRoutine  />} />
    </Routes>
</div>
)}

export default Main;
