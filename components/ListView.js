// @flow
import React from "react";
import type { Children } from "react";
import App from "../components/App";
import Header from "../components/Header";
import MovieList from "../components/MovieList";

type Props = { children?: Children };

export default ({ children }: Props) => (
  <App>
    <Header />
    <div>
      {children}
      <MovieList />
    </div>
    <style jsx>{`
      div {
        align-items: stretch;
        background-color: #333;
        color: #f4f4f4;
        display: flex;
        flex-direction: row;
        height: 95vh;
      }
    `}</style>
  </App>
);
