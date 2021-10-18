import { useEffect, useState } from "react";
import { baseURL } from "../App";
import RoutineActivity from "./RoutineActivity";
import UpdateRoutine from "./UpdateRoutine";

function MyRoutines(props) {
  //setting state for routines
  const [myRoutines, setMyRoutines] = useState([]);

  //state for new routines
  const [newRoutineName, setNewRoutineName] = useState("");
  const [newRoutineGoal, setNewRoutineGoal] = useState("");
  const [newRoutinePublic, setNewRoutinePublic] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  //setting the state if the routine is public--------
  const handleChange = (event) => {
    setNewRoutinePublic(event.target.value);
  };

  //function to post the newly created routine---------
  async function handleSubmit(e) {
    e.preventDefault();

    if (!props.user) {
      setErrorMessage("You need to be logged in");
      return;
    }
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
        body: JSON.stringify({
          name: newRoutineName,
          goal: newRoutineGoal,
          isPublic: newRoutinePublic,
        }),
      }
    );

    const info = await response.json();
    console.log(info);
  }

  //updating my routines for any changes
  useEffect(() => {
    fetchMyRoutines();
  }, []);
  //console.log(props.user);
  async function fetchMyRoutines() {
    const response = await fetch(
      `${baseURL}/users/${props.user.username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
      }
    );
    //console.log(response);
    const info = await response.json();
    //console.log(info);
    setMyRoutines(info);
  }
  //console.log(myRoutines);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={newRoutineName}
          onChange={(e) => setNewRoutineName(e.target.value)}
          placeholder="Enter routine name"
        ></input>
        <input
          value={newRoutineGoal}
          onChange={(e) => setNewRoutineGoal(e.target.value)}
          placeholder="Enter routine goal"
        ></input>
        <div></div>
        <select onChange={handleChange}>
          <option value={null}>null</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <button>Confirm New Routine</button>
        <p>{errorMessage}</p>
      </form>
      <div>
        {myRoutines.map((routine) => {
          return (
            <UpdateRoutine
              user={props.user}
              isPublic={routine.isPublic}
              routineId={routine.id}
              name={routine.name}
              creatorName={routine.creatorName}
              goal={routine.goal}
              activities={props.activities}
              routine={routine}
              fetchMyRoutines={fetchMyRoutines}
            />
          );
        })}
      </div>
    </>
  );
}

export default MyRoutines;
