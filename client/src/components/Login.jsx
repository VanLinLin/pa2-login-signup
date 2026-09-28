import { useState } from "react";

function Login() {
  // one state variable for each input box
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // runs when the Login button is clicked
  const handleSubmit = async (e) => {
    // stop the browser from reloading the page
    e.preventDefault();

    // send the username and password to the Express server as JSON
    await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;