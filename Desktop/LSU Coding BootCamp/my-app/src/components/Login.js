import { useState } from "react";
import { useHistory } from "react-router";
import { baseURL } from "../App";

function Login(props) {
  //creating states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    //getting info about user who logged in
    const info = await response.json();
    console.log(info);
    if (info.error) {
      setErrorMessage(info.message);
      return;
    }
    localStorage.setItem("token", info.token);
    props.setUser({
      token: info.token,
      id: info.user.id,
      username: info.user.username,
    });
    history.push("/");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        ></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          type="password"
          placeholder="Enter password"
        ></input>
        <button>Login</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
}

export default Login;
