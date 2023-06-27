import React, { useState } from "react";
import "./Login.css";

export const Register = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //send data to the backend
    //if success set the state to logged in
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Username</label>
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
