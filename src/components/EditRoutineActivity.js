import React from 'react'
import {patchRoutineActivities} from "../api"
import { useNavigate, useLocation } from "react-router-dom";

function EditRoutineActivity({allActivities}) {
    const location = useLocation();
    const routineActivityId = location.state.routineActivityId;
    const count = location.state.count;
    const duration = location.state.duration;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

  
    const singleActivity = allActivities.find(function (activity) {
      if (routineActivityId == routineActivityId) {
          return activity;
        } 
    });

  
    const handleSubmit = async (event) => {
      event.preventDefault();
      let count = event.target.count.value
      let duration = event.target.duration.value
      const patched = await patchRoutineActivities(count,duration,routineActivityId,token)
      if (patched) {
        navigate("/users/:username/routines");
      }
    }
  
    if(singleActivity){
    return (
      <div>
        <h1>Edit Activity</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Count
            <input
            placeholder=""
            name="count"
            defaultValue={count}
            ></input>
          </label>
          <label>
            Duration
            <input
            placeholder=""
            name="duration"
            defaultValue={duration}
            ></input>
          </label>
        <button type="submit">Update your Activity</button>
        </form>
      </div>
    );
  }

}

export default EditRoutineActivity