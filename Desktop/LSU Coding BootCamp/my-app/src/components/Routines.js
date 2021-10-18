import { useState } from "react";
import { useEffect } from "react";

function Routines(props) {
  //setting state for routines
  const [routines, setRoutines] = useState([]);

  //render all routines-------------------------------
  useEffect(() => {
    fetchRoutines();
  }, [routines]);

  //fetch all routines--------------------------------
  async function fetchRoutines() {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const info = await response.json();
    setRoutines(info);
  }

  return (
    <>
      {routines.map((ele) => {
        return ele.isPublic ? (
          <div key={ele.id}>
            <h3>
              {ele.name}, by {ele.creatorName}
            </h3>
            <h3>{ele.goal}</h3>
            <div>
              {ele.activities ? (
                ele.activities.map((ele, ind, arr) => {
                  return ele ? (
                    <div key={ele.id}>
                      <h4>Name: {ele.name}</h4>
                      <h4>Description: {ele.description}</h4>
                      <h4>Duration: {ele.duration}</h4>
                      <h4>Count: {ele.count}</h4>
                    </div>
                  ) : (
                    <></>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        );
      })}
    </>
  );
}

export default Routines;
