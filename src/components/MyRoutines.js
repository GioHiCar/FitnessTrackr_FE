import React, { useState, useEffect, Fragment } from "react";
import { useNavigate,Link } from "react-router-dom";
import { ValidUser, getUserRoutines, addRoutine, deleteRoutines,AddToRoutine} from "../api";


const MyRoutines = ({allActivities}) => {
  const [myInfo, setMyInfo] = useState([]);
  const [checked, setChecked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [activityId, setActivityId] = useState('')
  const [count, setCount] = useState('')
  const [duration, setDuration] = useState('')
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
//  console.log("THIS IS ALL ACTIVITIES:",allActivities,"THIS IS MY ROUTINES:",myInfo)

  const handleRoutineSubmit = async (event) => {
    event.preventDefault();
    console.log("handle routine submit")
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
        setMyInfo([added,...myInfo]);
        
      }
    }
  };

  const handleActivitySubmit = async (event) => {
    event.preventDefault();
    const routineId = event.target.value
    console.log(routineId)
    // console.log("THIS IS ROUTINE ID:",routineId,"THIS IS ACTIVITY ID",activityId)
  
   console.log("this is routine id:",routineId,"this is count:",count,"this is duration:",duration,"this is token:",token,"this is activity id:",activityId)
      const addedAct = await AddToRoutine(routineId,count,duration,token,activityId)
      
      // event.target[0].value = "";
      // event.target[1].value = "";
      // event.target[2].value = "";
      // event.target[3].value = "";
      
      if (addedAct) {
        setMyInfo([...myInfo,addedAct]);
        
      }
    }
  

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


  let handleActivity = (e) => {
    setActivityId(e.target.value)
    console.log(activityId)

}
  useEffect(() => {
    async function getMyInfo() {
      const myReturnedInfo = await ValidUser(token);
      const data = await getUserRoutines(token, myReturnedInfo.username);
      setMyInfo(data.reverse());
    }
    getMyInfo();
  }, [deleted]);


  

  const routines = token ? (
    <div className="boxAll">
      <h1>Add A Routine</h1>
      <form onSubmit={handleRoutineSubmit}>
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
        myInfo.map((routine, index) => {
          return (
            <div className="box" key={index}>
              <h2 className="routineTitle">Routine Name:{routine.name}</h2>
              <p className="routineUsername">Routine Goal:{routine.goal}</p>
               {routine.activities ? 
               routine.activities.map((activity, index) => {
                return (
                  <Fragment  key={index}>
                      <h2 className="routineTitle">Activity Name:{activity.name}</h2>
                      <p className="routineUsername">Activity Description:{activity.description}</p>
                      <p className="routineUsername">Activity Count:{activity.count}</p>
                      <p className="routineUsername">Activity Duration:{activity.duration}</p>
                 </Fragment>
                )
               }): <></>
                
               }
              <button
                id="editRoutine"
                type="button"
                value={routine.id}
                onClick={handleEdit}
              >Edit</button>
              <button
                id="deleteRoutine"
                type="button"
                value={routine.id}
                onClick={handleDelete}
              >Delete</button>
              <button
              onClick={handleActivitySubmit}
              value={routine.id}
                type="submit"
                name="routineId"
              >Add Activity to Routine</button>
              <select onChange={handleActivity} >
                 <option  name="activityId" defaultValue="Select an Activity">--Select an Activity--</option>
                 {allActivities.map((activity,index) => <option  key={index} value={activity.id}>{activity.name}</option>)}
              </select>
              <input onChange={event => setCount(event.target.value)} name="count" placeholder="Count:" ></input>
              <input onChange={event => setDuration(event.target.value)} name="duration" placeholder="Duration:" ></input>
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
     
  
 
}

export default MyRoutines;
