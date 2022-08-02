import React, { useState, useEffect } from "react";
import {ValidUser} from '../api'



const MyRoutines = (props) => {
    let token = "";
    const [myInfo, setMyInfo] = useState({});
    useEffect(() => {
      token = localStorage.getItem("token");
      async function getMyInfo() {
        const myReturnedInfo = await ValidUser(token);
        setMyInfo(myReturnedInfo);
      }
      getMyInfo();
    }, []);
  
    const routines = myInfo.length ? (
        <div className="boxAll">
          {myInfo.map((element, index) => {
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

    return <div className="box">{routines}</div>;
  };

export default MyRoutines