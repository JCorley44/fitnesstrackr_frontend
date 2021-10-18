import { useState } from "react";
import { baseURL } from "../App";

function UpdateRoutine(props) {
  //setting state for routines
  //state for error message
  const [errorMessage, setErrorMessage] = useState("");

  //creating states for updating routines
  const [updateRoutineName, setUpdateRoutineName] = useState("");
  const [updateRoutineGoal, setUpdateRoutineGoal] = useState("");
  const [updateRoutinePublic, setUpdateRoutinePublic] = useState(null);

  //creating states for adding activities to routines
  const [activityCount, setActivityCount] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityId, setActivityId] = useState();

  //deleting an activity
  const [deleteActivity, setDeleteActivity] = useState(false);
  const [routineActivityDelete, setRoutineActivityDelete] = useState();

  //updated routine activity states for input forms
  const [updatedCount, setUpdatedCount] = useState();
  const [updatedDuration, setUpdatedDuration] = useState();
  const [routineActivityToUpdate, setRoutineActivityToUpdate] = useState();

  //state if the routine  can be edit
  const [editRoutine, setEditRoutine] = useState(false);

  //state of activity to render the
  const [addActivity, setAddActivity] = useState(false);

  //state of render update activity
  const [updateActivity, setUpdateActivity] = useState(false);

  //setting state of the updated routine
  const handleUpdateChange = (event) => {
    setUpdateRoutinePublic(event.target.value);
  };

  const handleSelectedActivity = (event) => {
    setActivityId(event.target.value);
    // setActivityName(event.target.value.nameActivity);
  };

  const handleDeletedActivity = (e) => {
    //console.log(e.target.value);
    setRoutineActivityDelete(e.target.value);
  };

  const handleUpdatedRoutineActivity = (e) => {
    setRoutineActivityToUpdate(e.target.value);
  };

  //console.log(props);
  //updates a routine-----------------------------------------------
  async function updateRoutine(e) {
    e.preventDefault();
    if (!props.user) {
      setErrorMessage("you need to be logged in");
      return;
    }

    const response = await fetch(`${baseURL}/routines/${props.routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
      body: JSON.stringify({
        name: updateRoutineName,
        goal: updateRoutineGoal,
        isPublic: updateRoutinePublic,
      }),
    });

    const info = await response.json();
    console.log(info);

    setUpdateRoutineName("");
    setUpdateRoutineGoal("");
    setEditRoutine(false);
    props.fetchMyRoutines();
  }

  //Delete Routine---------------------------------------------------
  async function deleteRoutine() {
    const response = await fetch(`${baseURL}/routines/${props.routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
    });
    const info = await response.json();
    console.log(info);
    props.fetchMyRoutines();
  }

  //add activity to routine------------------------------------------
  async function addRoutineActivity(e) {
    e.preventDefault();
    if (!props.user) {
      setErrorMessage("you need to be logged in");
      return;
    }
    const response = await fetch(
      `${baseURL}/routines/${props.routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
        body: JSON.stringify({
          activityId: activityId,
          count: activityCount,
          duration: activityDuration,
        }),
      }
    );

    const info = await response.json();
    console.log(info);

    setActivityCount(0);
    setActivityDuration(0);
    setEditRoutine(false);
    props.fetchMyRoutines();
  }
  //Update Routine Activity----------------------------------------
  async function updateRoutineActivity(e) {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/api/routine_activities/${routineActivityToUpdate}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
        body: JSON.stringify({
          count: 2,
          duration: 30,
        }),
      }
    );

    const info = await response.json();
    console.log(info);
  }

  //Delete Routine Activity----------------------------------------

  async function deleteRoutineActivity(e) {
    e.preventDefault();

    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
      }
    );

    const info = await response.json();
    console.log(info);
    props.fetchMyRoutines();
  }

  console.log(props.routine);

  //webpage render===================================================
  return (
    <>
      {
        <>
          <div key={props.id}>
            <h3>
              {props.name}, by {props.creatorName}
            </h3>
            <h3>{props.goal}</h3>
            {props.routine.activities.map((activity) => {
              return (
                <div key={activity.id}>
                  <h4>Activity Name: {activity.name}</h4>
                  <ul>
                    <li>Count: {activity.count}</li>
                    <li>Duration: {activity.duration}</li>
                  </ul>
                </div>
              );
            })}
          </div>
          )
        </>
      }
      {props.activity && <div>things</div>}
      <button onClick={() => setEditRoutine(true)}>Update Routine</button>
      <button onClick={deleteRoutine}>Delete Routine</button>
      <button onClick={() => setAddActivity(true)}>Add Activity</button>
      <button onClick={() => setDeleteActivity(true)}>Delete Activity</button>
      <button onClick={() => setUpdateActivity(true)}>Update Activity</button>
      {editRoutine && (
        <form onSubmit={updateRoutine}>
          <input
            value={updateRoutineName}
            onChange={(e) => setUpdateRoutineName(e.target.value)}
            placeholder="Update routine"
          ></input>
          <input
            value={updateRoutineGoal}
            onChange={(e) => setUpdateRoutineGoal(e.target.value)}
            placeholder="Update routine goal"
          ></input>
          <div></div>
          <select onChange={handleUpdateChange}>
            <option value={null}>null</option>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
          <button>Confirm Update Routine</button>
          <p>{errorMessage}</p>
        </form>
      )}
      {addActivity && (
        <form onSubmit={addRoutineActivity}>
          <input
            value={activityCount}
            onChange={(e) => setActivityCount(e.target.value)}
            placeholder="Enter activity count"
          ></input>
          <input
            value={activityDuration}
            onChange={(e) => setActivityDuration(e.target.value)}
            placeholder="Enter activity duration"
          ></input>
          {
            <select onChange={handleSelectedActivity}>
              {props.activities.map((activity) => {
                //console.log(activity.id);
                return <option value={activity.id}>{activity.name}</option>;
              })}
            </select>
          }
          <button>Confirm Add Activity</button>
          <p>{errorMessage}</p>
        </form>
      )}
      {updateActivity && (
        <>
          <form onSubmit={updateRoutineActivity}>
            <input
              value={updatedCount}
              onChange={(e) => setUpdatedCount(e.target.value)}
              placeholder="Enter activity count"
            ></input>
            <input
              value={updatedDuration}
              onChange={(e) => setUpdatedDuration(e.target.value)}
              placeholder="Enter activity duration"
            ></input>
          </form>
          <form onSubmit={updateRoutineActivity}>
            {
              <select onChange={handleUpdatedRoutineActivity}>
                {props.routine.activities.map((activity) => {
                  //console.log(activity.routineActivityId);
                  return (
                    <option value={activity.routineActivityId}>
                      {activity.name}
                    </option>
                  );
                })}
              </select>
            }
            <button>Confirm Update Activity</button>
          </form>
        </>
      )}

      {deleteActivity && (
        <form onSubmit={deleteRoutineActivity}>
          {
            <select onChange={handleDeletedActivity}>
              {props.routine.activities.map((activity) => {
                //console.log(activity.routineActivityId);
                return (
                  <option value={activity.routineActivityId}>
                    {activity.name}
                  </option>
                );
              })}
            </select>
          }
          <button>Confirm Delete Activity</button>
          <p>{errorMessage}</p>
        </form>
      )}
    </>
  );
}

export default UpdateRoutine;
