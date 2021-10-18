import { useEffect } from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";

function Activities() {
  const [activities, setActivities] = useState([]);
  const history = useHistory();

  function handleClick() {
    history.push("/create-activity");
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  async function fetchActivities() {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const info = await response.json();
    //console.log(info);
    setActivities(info);
  }
  //fetchActivities();
  console.log(activities);
  return (
    <>
      <button onClick={handleClick}>Create a new activity</button>
      {activities.map((ele, ind, arr) => {
        return (
          <div key={ele.id}>
            <h3>{ele.name}</h3>
            <h2>{ele.description}</h2>
          </div>
        );
      })}
    </>
  );
}

export default Activities;
