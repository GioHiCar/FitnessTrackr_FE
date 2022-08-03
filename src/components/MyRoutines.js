import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { ValidUser, getUserRoutines, addRoutine } from "../api";


const MyRoutines = (props) => {
  let token = "";
  const [myInfo, setMyInfo] = useState({});
  const [refresh, setRefresh] = useState(false)
console.log(refresh)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const goal = event.target[1].value;

    addRoutine(name, goal,token);
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    async function getMyInfo() {
      const myReturnedInfo = await ValidUser(token);
      const data = await getUserRoutines(token, myReturnedInfo.username);
      setMyInfo(data);
    }
    getMyInfo();
  }, [refresh]);

  const handleClick = event => {
    refresh ? setRefresh(false): setRefresh(true);
  };

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
      <h1>Add A Routine</h1>
      <form onSubmit={handleSubmit}>
        <label className="my_routine">
          Name:
          <input placeholder="enter Routine Name" id="name" />
        </label>

        <label className="my_routine">
          Goal:
          <input placeholder="enter Routine Goal" id="goal" />
        </label>
        
        <button type="submit" onClick={handleClick}>Add Routine</button>
      </form>
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
  ) : (
    <div>
        <h1>You Must Be Logged In To Add a Routine</h1>
        <h4>Click <Link to= '/'>Here</Link>  To Login or Register</h4>
    </div>
  );

  return <div className="box">{routines}</div>;
};

export default MyRoutines;


{/* <fieldset>
          <legend>Set Status:</legend>
          <div>
            <input
              type="radio"
              id="isPublic"
              name="status"
              value="true"
              onChange={(event) => setIsPublic(event.target.value)}
            />
            <label htmlFor="isPublic">Public</label>
            <input
              type="radio"
              id="isPrivate"
              name="status"
              value="false"
              onChange={(event) => setIsPublic(event.target.value)}
            />
            <label htmlFor="isPrivate">Private</label>
          </div>
        </fieldset> */}