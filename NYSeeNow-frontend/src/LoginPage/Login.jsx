import React, { useEffect, useState } from "react";
import "./Login.css";
import fetch from "isomorphic-fetch";
import {post} from "../net/net";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: pass,
    };

    const url = "api/auth/login";

    post(url, data, (message, status) => {
      // Success callback function
      console.log("Success:", message);
      console.log("Status:", status);
    }, (message, status) => {
      // Failure callback function
      console.log("Failure:", message);
      console.log("Status:", status);
    }, (error) => {
      // Error callback function
      console.error("Error:", error);
    });
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
