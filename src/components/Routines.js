import React, { useEffect, useState } from "react";
import { getAllRoutines, ValidUser } from "../api";

const Routines = ({allActivities}) => {
    const [allRoutines, setAllRoutines] = useState([]);
console.log(allRoutines)
      useEffect(() => {
        async function fetchRoutines() {
          // const token = localStorage.getItem("token");
          // const myReturnedInfo = await ValidUser(token);
          // console.log(myReturnedInfo, 'this islogged in users info')
          // setUsername(myReturnedInfo.id)
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
              <div className="box" key={index}>
                <h1 className="routinesUsername">{element.creatorName}</h1>
                <h2 className="routineTitle">{element.name}</h2>
                <p className="routineUsername">{element.goal}</p>
                {element.activities.map((activity, index) => (
                  <div key={index}>{activity.name}</div>
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