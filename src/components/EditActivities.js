import React from 'react'
import {patchActivities} from "../api"
import { useNavigate, useLocation } from "react-router-dom";
// name, description,activityId,token


function EditActivities({allActivities}) {
    
    const location = useLocation()
    const ActivityId = location.state.ActivityId
    const token = localStorage.getItem("token");
    




  return (
    <div>EditActivities</div>
  )
}

export default EditActivities