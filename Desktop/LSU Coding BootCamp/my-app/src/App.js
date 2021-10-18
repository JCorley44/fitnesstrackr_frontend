import { useEffect } from "react";
import { Route } from "react-router";
import { useState } from "react/cjs/react.development";
import "./App.css";
import Activities from "./components/Activities";
import Home from "./components/Home";
import Login from "./components/Login";
import MyRoutines from "./components/MyRoutines";
import Navbar from "./components/Navbar";
import NewActivity from "./components/NewActivity";
import Register from "./components/Register";
import Routines from "./components/Routines";

export const baseURL = "http://fitnesstrac-kr.herokuapp.com/api";

function App() {
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     setUser(localStorage.getItem("user"));
  //   }
  // }, []);

  //console.log(user);
  useEffect(() => {
    if (!localStorage.getItem("token")) return setUser(null);
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      const resp = await fetch(`${baseURL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const info = await resp.json();
      console.log(info);
      setUser({
        id: info.user.id,
        username: info.user.username,
        token: token,
      });
    };
    fetchUser();
  }, []);

  const [activities, setActivities] = useState([]);

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
    setActivities(info);
  }

  console.log(activities);
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route path="/my-routines">
        <MyRoutines user={user} activities={activities} />
      </Route>
      <Route path="/activities">
        <Activities activities={activities} />
      </Route>
      <Route path="/create-activity">
        <NewActivity user={user} />
      </Route>
      <Route path="/login">
        <Login setUser={setUser} user={user} />
      </Route>
      <Route path="/register">
        <Register setUser={setUser} user={user} />
      </Route>
      <Route path="/routines">
        <Routines user={user} activities={activities} />
      </Route>
    </div>
  );
}

export default App;
