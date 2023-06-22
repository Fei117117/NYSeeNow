import React, { useEffect, useState } from "react";
import "./Login.css";
import fetch from "isomorphic-fetch";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: pass,
    };
    console.log(JSON.stringify(data));
    fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          id="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button>Login</button>
      </form>
      <button onClick={() => props.onFormSwitch("register")}>
        Don't have an account? Register here.{" "}
      </button>
    </div>
  );
};
