import { useState } from "react";

function Signup() {
  // one state variable for each input box
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // runs when the Signup button is clicked
  const handleSubmit = async (e) => {
    // stop the browser from reloading the page
    e.preventDefault();

    // send the four fields to the Express server as JSON
    await fetch("http://localhost:9000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        f_name,
        l_name,
        username,
        password,
      }),
    });
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={f_name}
          onChange={(e) => setFName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={l_name}
          onChange={(e) => setLName(e.target.value)}
        />

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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;