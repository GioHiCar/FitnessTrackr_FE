import React from 'react'
import { Test, Navbar, Activities, MyRoutines, Routines } from './';
import { Routes, Route } from "react-router-dom";


const Main = () => {
return(
  <div>
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/routines" element={<Routines />} />
      <Route path="/" element={<Test />} />
      <Route path="/" element={<Test />} />
    </Routes>
    <div>
        <Navbar />
    </div>
</div>
)}

export default Main;
