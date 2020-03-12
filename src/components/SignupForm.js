import React from "react";

export default function SignupForm(props) {
  return (
    <div id="signup-form">
      <h3>Sign up</h3>
      <form onSubmit={props.onSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="email"
          value={props.email}
          onChange={props.onChange}
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="password"
          value={props.password}
          onChange={props.onChange}
        ></input>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
