import React, { useState, useEffect } from "react";
import { ValidUser, getUserRoutines, patchRoutines } from "../api";
import { useNavigate, useLocation } from "react-router-dom";

const EditRoutine = () => {
  const [checked, setChecked] = useState(false);
  const [myInfo, setMyInfo] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const routineId = location.state.routineId;

  const singleRoutine = myInfo.find(function (routine) {
    if (routine.id == routineId) {
      return routine;
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const goal = event.target[1].value;
    const isPublic = checked;
    const exists = myInfo.find(function (info, index) {
      if (info.name === name) {
        return true;
      } else {
        return false;
      }
    });
    if (event.target[0].value === "" || event.target[1].value === "") {
      alert("Name or Goal can not be left blank.");
    } else if (exists && event.target[0].value != singleRoutine.name) {
      alert(`Routine name already exists, Try ${event.target[0].value}` + 1);
      event.target[0].value += "1";
    } else {
      const patched = await patchRoutines(
        name,
        goal,
        isPublic,
        token,
        routineId
      );
      event.target[0].value = "";
      event.target[1].value = "";

      if (patched) {
        navigate("/users/:username/routines");
        setMyInfo([...myInfo, patched]);
      }
    }
  };

  const handleChange = async () => {
    setChecked(!checked);
  };

  const handleClick = () => {
    navigate("/users/:username/routines");
  };

  useEffect(() => {
    async function getMyInfo() {
      const myReturnedInfo = await ValidUser(token);
      const data = await getUserRoutines(token, myReturnedInfo.username);
      setMyInfo(data);
    }
    getMyInfo();
  }, []);

  const EditForm = (
    <div className="boxAll">
      <h1>Edit your Routine</h1>
      {singleRoutine ? (
        <form onSubmit={handleSubmit}>
          <label className="my_routine">
            Name:
            <input
              placeholder="Enter Routine Name"
              id="name"
              defaultValue={singleRoutine.name}
            />
          </label>

          <label className="my_routine">
            Goal:
            <input
              placeholder="Enter Routine Goal"
              id="goal"
              defaultValue={singleRoutine.goal}
            />
          </label>
          <fieldset>
            <legend>Keep Routine ::</legend>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                id="isPublic"
              />
              Check to Make Public
            </label>
          </fieldset>
          <button type="submit">Update your Routine</button>
          <button type="button" onClick={handleClick}>
            Cancel Update
          </button>
        </form>
      ) : null}
    </div>
  );

  return <div className="box">{EditForm}</div>;
};

export default EditRoutine;
