// @flow
import React from "react";
import Link from "next/link";
import App from "../components/App";
import Header from "../components/Header";
import withData from "../lib/withData";

export default withData(({ url }) => (
  <App>
    <Header pathname={url.pathname} />
    <div className="login">
      <form>
        <fieldset>
          <legend>Create an Account</legend>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
        </fieldset>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div className="link">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </form>
    </div>
    <style jsx>{`
      a {
        display: block;
      }

      button {
        background-color: transparent;
        border-color: #000;
        border-style: solid;
        border-width: 1px;
        display: inline-block;
        font-family: 'Courier Next', courier, monospace;
        font-size: 1rem;
        font-weight: bold;
        padding: .5rem 1rem;
      }

      button:hover,
      button:focus {
        background-color: #000;
        color: #fff;
        cursor: pointer;
      }

      fieldset {
        border-color: transparent;
        border-style: solid;
        border-width: 1px;
        margin-left: 0;
        margin-right: 0;
        padding-left: 0;
        padding-right: 0;
      }

      form {
        margin-right: auto;
        margin-left: auto;
        max-width: 30em;
      }

      input {
        appearance: none;
        background-color: #fff;
        border-style: solid;
        border-width: 1px;
        font-family: 'Courier Next', courier, monospace;
        max-width: 30em;
        padding: .5rem;
        width: 100%;
      }

      button::-moz-focus-inner,
      input::-moz-focus-inner {
        border: 0;
        padding: 0;
      }

      label {
        display: block;
        font-size: .875rem;
        font-weight: 600;
        line-height: 1.5;
      }

      legend {
        font-size: 1.25rem;
        font-weight: 600;
        margin-left: 0;
        margin-right: 0;
        padding-left: 0;
        padding-right: 0;
      }

      .username {
        margin-top: 1rem;
      }

      .link {
        line-height: 1.5;
        margin-top: 1.5rem;
      }

      .login {
        padding: 2rem;
      }
    `}</style>
  </App>
));
