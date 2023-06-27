import React, { useState } from "react";
import "./Login.css";
import {post} from "../net/net";

export const Register = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: pass,
      email: email
    };

    post("/api/auth/register", userData,
        (message, status) => {
          // Handle success
          console.log("Registration successful:", message, status);
          // Set the state to indicate that the user is logged in
        },
        (message, status) => {
          // Handle failure
          console.error("Registration error:", message, status);
          // Display an error message to the user
        }
    );
  };


  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-mail"
          id="email"
        />
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
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          id="password"
        />
        <button>Create Account</button>
      </form>
      <button onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.{" "}
      </button>
    </div>
  );
};
