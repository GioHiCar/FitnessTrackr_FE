import React, { useEffect, useState } from 'react'
import { addActivity} from '../api'
import { useNavigate,Link } from "react-router-dom";


const Activities = ({allActivities}) => {
     
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
    const name = event.target[0].value;
    const description = event.target[1].value;

    const exists = allActivities.find(function(allActivities, index) {
   
      if(allActivities.name === name) {
       return true;
      }else{ 
       return false}
        
      });
    if( event.target[0].value === '' || event.target[1].value === '') {
        alert("Name or description can not be left blank.")
        
    }else if (exists){
      alert(`Activity name already exists, Try ${event.target[0].value}` + 1)
      event.target[0].value += '1'
    }
      else{const added = await addActivity(name, description,token)
        event.target[0].value = ''
        event.target[1].value = ''
   
  }
  };

  useEffect(() => {
   

    
  }, []);


  const handleEdit = (event) => {
    const activityId = event.target.value
    navigate("/EditActivities", {state:{activityId}})
  };

      const reverseList = allActivities.slice(0).reverse()
      const displayActivities = token ? (
          <div className="boxAll">
                  <h1>Add An Activity</h1>
      <form onSubmit={handleSubmit}>
        <label className="my_activity">
          Name:
          <input placeholder="enter Activity Name" id="name" />
        </label>

        <label className="my_activity">
          Goal:
          <input placeholder="enter Activity Goal" id="Goal" />
        </label>
        
        <button type="submit">Add Activity</button>
      </form>
          {reverseList.map((element, index) => {
            return (
              <div className="box" key={index}>
                <h2 className="activityTitle">{element.name}</h2>
                <p className="activityDescription">{element.description}</p>
              <button
                id="editRoutine"
                type="button"
                value={element.id}
                onClick={handleEdit}
              >Edit</button>
            </div>
            );
          })}

      <button
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
        style={{
          position: 'fixed',
          padding: '1rem 2rem',
          fontSize: '20px',
          bottom: '40px',
          right: '40px',
          backgroundColor: '#AF3800',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '20px'
        }}
      >
        Scroll to top
      </button>
        </div>
      ) :  (
        <div>
            <h1>You Must Be Logged In To Add an Activity</h1>
            <h4>Click <Link to= '/'>Here</Link>  To Login or Register</h4>
            {allActivities.map((element, index) => {
            return (
              <div className="box" key={index}>
                <h2 className="activityTitle">{element.name}</h2>
                <p className="activityDescription">{element.description}</p>
              </div>
            );
          })}
        </div>
      );
    
      return <div className="box">{displayActivities}</div>;
    };

export default Activities