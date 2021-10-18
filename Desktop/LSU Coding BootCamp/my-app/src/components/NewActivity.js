import { useState } from "react";
import { useHistory } from "react-router";

function NewActivity(props) {
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");

  const [addActivity, setAddActivity] = useState(false);

  console.log(props.user);
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription,
        }),
      }
    );

    const info = await response.json();
    console.log(info);
  }

  return (
    <>
      <button onClick={() => setAddActivity(true)}>Add Activity</button>
      {addActivity && (
        <form onSubmit={handleSubmit}>
          <input
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="Enter activity name"
          ></input>
          <input
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            placeholder="Enter activity description"
          ></input>
          <button>Confirm New Routine</button>
        </form>
      )}
    </>
  );
}

export default NewActivity;
