import React, { useEffect, useState } from "react";
import { getAllRoutines } from "../api";

const Routines = () => {
    const [allRoutines, setAllRoutines] = useState([]);

    const handleMessage = (event) => {
        event.preventDefault();
      };

      useEffect(() => {
        async function fetchRoutines() {
          if (!allRoutines.length) {
            const retrievedRoutines = await getAllRoutines();
            setAllRoutines(retrievedRoutines);
          }
        }
    
        fetchRoutines();
      }, []);

      const displayRoutines = allRoutines.length ? (
        <div className="boxAll">
          {allRoutines.map((element, index) => {
            return (
              <div className="box" key={index}>
                <h2 className="routineTitle">{element.name}</h2>
                <p className="routineUsername">{element.goal}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading Routines...</div>
      );

    return(
        <div>
             {displayRoutines}
        </div>
    )
}

export default Routines