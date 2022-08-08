import React, { useEffect, useState } from "react";
import { getAllRoutines, ValidUser } from "../api";

const Routines = ({allActivities}) => {
    const [allRoutines, setAllRoutines] = useState([]);
      useEffect(() => {
        async function fetchRoutines() {
          if (!allRoutines.length) {
            const retrievedRoutines = await getAllRoutines();
            setAllRoutines(retrievedRoutines);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
          }
        }
    
        fetchRoutines();
      }, []);

      const reverseList = allRoutines.slice(0).reverse();
      
      const displayRoutines = allRoutines.length ? (
        <div className="boxAll">
          {reverseList.map((element, index) => {
              
            return (
              <div className="border-solid border-2 border-teal-900" key={index}>
                <h1 className="font-bold ml-2 underline underline-offset-4" >Creator:</h1> <p className="ml-2 " >{element.creatorName}</p>
                <h2 className="font-bold ml-2 underline underline-offset-4" >Routine Title:</h2> <p className="ml-2"> {element.name}</p>
                <p className="font-bold ml-2 underline underline-offset-4" >Routine Goal: </p> <p className="ml-2">{element.goal}</p>
                {element.activities.map((activity, index) => (
                  <div key={index}>
                    <p className="font-bold ml-2 underline underline-offset-4" >Activity Name:</p> <p className="ml-2">{activity.name}</p>
                    <p className="font-bold ml-2 underline underline-offset-4" > Activity Description:</p> <p className="ml-2">{activity.description}</p>
                    <p className="font-bold ml-2 underline underline-offset-4" > Duration:</p> <p className="ml-2">{activity.duration}</p>
                    <p className="font-bold ml-2 underline underline-offset-4" > Count:</p> <p className="ml-2">{activity.count}</p>
                  </div>
                ))}
              </div>
            );}
          )}
        </div>
      ) : (
        <div>Loading Routines...</div>
      );

    return(
        <div>
             {displayRoutines}
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
  );
}
        
    


export default Routines