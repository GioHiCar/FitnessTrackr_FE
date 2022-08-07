import React from "react";
import { patchActivities } from "../api";
import { useNavigate, useLocation } from "react-router-dom";
// name, description,activityId,token

function EditActivities({ allActivities }) {
  const location = useLocation();
  const activityId = location.state.activityId;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const singleActivity = allActivities.find(function (activity) {
    if (activity.id == activityId) {
      console.log(activityId, 'this is activityId')
      return activity;
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let name = event.target.name.value
    let description = event.target.description.value
    const patched = await patchActivities(name, description, activityId, token)
    console.log(patched)
    if (patched) {
      navigate("/users/:username/routines");
    }
  }

  if(singleActivity){
  return (
    <div>
      <h1>Edit Activity</h1>
      <form onSubmit={handleSubmit}>

        <label
        placeholder="">
          Name
          <input
          placeholder=""
          name="name"
          defaultValue={singleActivity.name}
          ></input>
        </label>

        <label>
          Description
          <input
          placeholder=""
          name="description"
          defaultValue={singleActivity.description}
          ></input>
        </label>
      <button type="submit">Update your Activity</button>
      </form>
    </div>
  );
}
}
export default EditActivities;
