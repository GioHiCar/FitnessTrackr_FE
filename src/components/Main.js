import React, { useState,useEffect } from "react";
import {Navbar, Activities, MyRoutines, Routines, Home, Register, EditRoutine,EditActivities,EditRoutineActivity } from './';
import { Routes, Route } from "react-router-dom";
import { getAllActivities} from "../api";


const Main =  () => {
  const [token, setToken] = useState("");
  const [allActivities, setAllActivities] = useState([]);
  useEffect(() => {
        
    async function fetchActivities() {
        const retrievedActivities = await getAllActivities();
        setAllActivities(retrievedActivities);
    }

    fetchActivities();
  }, []);

return(
  <div>
    <div>
        <Navbar />
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/routines" element={<Routines allActivities={allActivities} />} />
      <Route path="/activities" element={<Activities allActivities={allActivities} />} />
      <Route path="/users/:username/routines" element={<MyRoutines allActivities={allActivities} />} />
      <Route path="/register" element={<Register token={token} setToken={setToken} />}/>
      <Route path="/EditRoutine" element={<EditRoutine  />} />
      <Route path="/EditActivities" element={<EditActivities allActivities={allActivities} />} />
      <Route path="/EditRoutineActivity" element={<EditRoutineActivity allActivities={allActivities} />} />
    </Routes>
</div>
)}

export default Main;
