// import { useState } from "react";
// import { baseURL } from "../App";

// function RoutineActivity(props) {
//   //setting state for routines
//   console.log(props);
//   //state for error message
//   const [errorMessage, setErrorMessage] = useState("");

//   //creating states for adding activities to routines
//   const [activityCount, setActivityCount] = useState(0);
//   const [activityDuration, setActivityDuration] = useState("");
//   const [activityId, setActivityId] = useState(null);

//   //state if the routine is rendered
//   const [editRoutine, setEditRoutine] = useState(false);

//   //updates a routine--------------------------------------------------------------
//   async function addActivity(e) {
//     e.preventDefault();
//     if (!props.user) {
//       setErrorMessage("you need to be logged in");
//       return;
//     }
//     const response = await fetch(
//       `${baseURL}/routines/${props.routineId}/activities`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${props.user.token}`,
//         },
//         body: JSON.stringify({
//           activityId: activityId,
//           count: activityCount,
//           duration: activityDuration,
//         }),
//       }
//     );

//     const info = await response.json();
//     console.log(info);

//     setActivityCount(0);
//     setActivityDuration(0);
//     setEditRoutine(false);
//     setActivityId(null);
//   }

//   return (
//     <>
//       {/* creating the list of all routines */}
//       {
//         <div key={props.id}>
//           <h3>
//             {props.name}, by {props.creatorName}
//           </h3>
//           <h3>{props.goal}</h3>
//         </div>
//       }
//       {props.activity && <div>things</div>}
//       <button onClick={() => setEditRoutine(true)}>Update Activity</button>
//       {editRoutine && (
//         <form onSubmit={updateActivity}>
//           <input
//             value={activityCount}
//             onChange={(e) => setActivityCount(e.target.value)}
//             placeholder="Enter activity count"
//           ></input>
//           <input
//             value={activityDuration}
//             onChange={(e) => setActivityDuration(e.target.value)}
//             placeholder="Enter activity duration"
//           ></input>
//           <div></div>
//           {/* <select onChange={handleUpdateChange}>
//             <option value={null}>null</option>
//             <option value={true}>true</option>
//             <option value={false}>false</option>
//           </select> */}
//           <button>Confirm Add Activity</button>
//           <p>{errorMessage}</p>
//         </form>
//       )}
//     </>
//   );
// }

// export default RoutineActivity;
