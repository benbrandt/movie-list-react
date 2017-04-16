// @flow
import React from "react";
import Link from "next/link";

export default () => (
  <header>
    <nav>
      <Link prefetch href="/">
        <a className="home">Movie list</a>
      </Link>

      <div className="links">
        <Link prefetch href="/login">
          <a className="login">Login</a>
        </Link>
        <Link prefetch href="/signup">
          <a>Signup</a>
        </Link>
      </div>
    </nav>

    <style jsx>{`
      nav {
        background-color: #111;
        display: flex;
        height: 5vh;
        justify-content: space-between;
      }

      a {
        color: #fff;
        font-size: .875rem;
        opacity: 1;
        text-decoration: none;
        transition: color .15s ease-in, opacity .15s ease-in;
      }

      a:hover,
      a:focus {
        opacity: .5;
        transition: opacity .15s ease-in;
      }
      a:active {
        opacity: .8; transition: opacity .15s ease-out;
      }

      a:link, a:visited {
        transition: color .15s ease-in;
      }

      .home {
        align-items: center;
        display: flex;
        font-weight: bold;
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .links {
        align-items: center;
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
        padding: 1rem;
      }

      .login {
        margin-right: 1rem;
      }
    `}</style>
  </header>
);
