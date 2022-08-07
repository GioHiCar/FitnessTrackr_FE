import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { ValidUser, getUserRoutines, addRoutine, deleteRoutines} from "../api";


const MyRoutines = () => {
  const [myInfo, setMyInfo] = useState([]);
  const [checked, setChecked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const goal = event.target[1].value;


    const isPublic = checked;
    const exists = myInfo.find(function (info) {
      if (info.name === name) {
        console.log("DUPLICATE FOUND!!!!!!!!!!!!!");

        return true;
      } else {
        console.log("NO DUPLICATE FOUND!!!!!!!!!!!!");
        return false;
      }
    });
     if (exists) {
      alert(`Routine name already exists, Try ${event.target[0].value}` + 1);
      event.target[0].value += "1";
    } else {
      const added = await addRoutine(name, goal, isPublic, token);

      
      event.target[0].value = "";
      event.target[1].value = "";
      event.target[2].value = "";
      event.target[3].value = "";
      
      if (added) {
        setMyInfo([...myInfo, added]);
        
      }
    }
  };


  const handleChange = () => {
    setChecked(!checked);
  };


  const handleEdit = (event) => {
    const routineId = event.target.value
    navigate("/EditRoutine", {state:{routineId}})
  };

  const handleDelete = async (event) => {
    if(confirm("Are you sure?")){
      const routineId = event.target.value
    const deleted = await deleteRoutines(token,routineId)
    setDeleted(deleted)
    return deleted
    } else {
      return null
    }
  }
  
  useEffect(() => {
    async function getMyInfo() {
      const myReturnedInfo = await ValidUser(token);
      const data = await getUserRoutines(token, myReturnedInfo.username);
      setMyInfo(data);
    }
    getMyInfo();
  }, [deleted]);

 
  

  const routines = token ? (
    <div className="boxAll">
      <h1>Add A Routine</h1>
      <form onSubmit={handleSubmit}>
        <label className="my_routine">
          Name:
          <input required placeholder="Enter Routine Name" id="name" />
        </label>

        <label className="my_routine">
          Goal:
          <input required placeholder="Enter Routine Goal" id="goal" />
        </label>


        <fieldset>
          <legend>Set Visibility::</legend>
          <label>
            <input
              type="checkbox"
              checked={checked === true}
              onChange={handleChange}
              id="isPublic"
            />
            Check to Make Public
          </label>
        </fieldset>
        <button 
        type="submit">
        Add Routine
        </button>
      </form>
      {!myInfo[0] ? (
        <div>You have no routines!</div>
      ) : (
        myInfo.map((element, index) => {
          return (
            <div className="box" key={index}>
              <h2 className="routineTitle">{element.name}</h2>
              <p className="routineUsername">{element.goal}</p>
              <p className="routineUsername">{element.count}</p>
              <p className="routineUsername">{element.duration}</p>
              <button
                id="editRoutine"
                type="button"
                value={element.id}
                onClick={handleEdit}
              >Edit</button>
              <button
                id="deleteRoutine"
                type="button"
                value={element.id}
                onClick={handleDelete}
              >Delete</button>
              <button
                id="deleteRoutine"
                type="button"

              >Add Activity to Routine</button>
            </div>
          );
        })
      )}
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

  return (

<div className="box">{routines}</div>
  )
     
  
 
};

export default MyRoutines;
