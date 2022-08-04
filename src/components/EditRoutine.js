import React, { useState, useEffect } from 'react'
import { ValidUser, getUserRoutines, addRoutine,patchRoutines } from "../api";
import { useNavigate } from "react-router-dom";

const EditRoutine = () => {
    const [checked, setChecked] = useState(false)
    const [myInfo, setMyInfo] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const goal = event.target[1].value;
        const isPublic = checked
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
        } 
        else{
          const added = await addRoutine(name, goal,isPublic, token)
          event.target[0].value = ''
          event.target[1].value = ''
          
          if(added){
              navigate("/users/:username/routines")
          setMyInfo([...myInfo,added ])
        }} 

}

const handleChange = async (event) => {
setChecked(!checked);

}

const handleClick = () => {
  navigate('/users/:username/routines')
}

useEffect(() => {
    async function getMyInfo() {
      const myReturnedInfo = await ValidUser(token);
      const data = await getUserRoutines(token, myReturnedInfo.username);
      setMyInfo(data);
    }
    getMyInfo();
  }, []);




  const EditForm = 
  <div className="boxAll">
  <h1>Edit your Routine</h1>
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
    <button type="submit">Update your Routine</button>
    <button type="button" onClick={handleClick}>Cancel Update</button>
  </form>
</div>


return(
    <div className="box">{EditForm}</div>
)
}

export default EditRoutine