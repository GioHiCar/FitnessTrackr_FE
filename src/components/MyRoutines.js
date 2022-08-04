import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { ValidUser, getUserRoutines, addRoutine,patchRoutines } from "../api";


const MyRoutines = (props) => {
  const [myInfo, setMyInfo] = useState([]);
const [checked, setChecked] = useState(false)
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const goal = event.target[1].value;

    const isPublic = checked
    console.log(checked, 'this is cheked')
    const exists = myInfo.find(function(info, index) {
   
       if(info.name === name) {
         console.log("DUPLICATE FOUND!!!!!!!!!!!!!")

        return true;
      } else {
        console.log("NO DUPLICATE FOUND!!!!!!!!!!!!");
        return false;
      }
    });
    if (event.target[0].value === "" || event.target[1].value === "") {
      alert("Name or Goal can not be left blank.");
    } else if (exists) {
      alert(`Routine name already exists, Try ${event.target[0].value}` + 1);
      event.target[0].value += "1";
    } else {
      const added = await addRoutine(name, goal, token);
      event.target[0].value = "";
      event.target[1].value = "";
      if (added) {
        setMyInfo([...myInfo, added]);
      }
    }

    else{const added = await addRoutine(name, goal,isPublic, token)
      console.log('added to routines list')
      event.target[0].value = ''
      event.target[1].value = ''
      
      if(added){
      setMyInfo([...myInfo,added ])
    }} 
  };
  
  const handleChange = () => {
    setChecked(!checked);
    console.log(checked)
  }

  const handleEdit = (event) => {
    console.log(event, 'i happened')
    // const routineId = element.id
    // <Route path="/EditRoutine" element={<EditRoutine  />} />
    <EditRoutine  />
  }


  useEffect(() => {
    async function getMyInfo() {
      const myReturnedInfo = await ValidUser(token);
      const data = await getUserRoutines(token, myReturnedInfo.username);

      setMyInfo(data);
    }
    getMyInfo();
  }, []);



  const routines = token ? (

    <div className="boxAll">
      <h1>Add A Routine</h1>
      <form onSubmit={handleSubmit}>
        <label className="my_routine">
          Name:
          <input placeholder="Enter Routine Name" id="name" />
        </label>

        <label className="my_routine">
          Goal:
          <input placeholder="Enter Routine Goal" id="goal" />
        </label>

        <fieldset>
          <legend>
            Set Visibility::
          </legend>
          <label>
          <input 
          type = 'checkbox' 
          checked={checked===true} 
          onChange={handleChange} 
          id='isPublic'/>
          Check to Make Public</label>
        </fieldset>
        

        <button type="submit">Add Routine</button>
      </form>
      {!reverseList[0] ? (
        <div>You have no routines!</div>
      ) : (reverseList.map((element, index) => {
        console.log(reverseList)
        return (
          <div className="box" key={index}>
            <h2 className="routineTitle">{element.name}</h2>
            <p className="routineUsername">{element.goal}</p>

            <button
            id='editRoutine'
            type= 'button'
            value = {element.id}
            onClick={handleEdit}>
            <Link to = '/EditRoutine'>Edit</Link></button>

          </div>
        );
      }))}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        style={{
          position: "fixed",
          padding: "1rem 2rem",
          fontSize: "20px",
          bottom: "40px",
          right: "40px",
          backgroundColor: "#AF3800",
          color: "#fff",
          textAlign: "center",
          borderRadius: "20px",
        }}
      >
        Scroll to top
      </button>
    </div>
  ) : (
    <div>
      <h1>You Must Be Logged In To Add a Routine</h1>
      <h4>
        Click <Link to="/">Here</Link> To Login or Register
      </h4>
    </div>
  );

  return <div className="box">{routines}</div>;
};

export default MyRoutines;


