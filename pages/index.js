// @flow
import React from "react";
import App from "../components/App";
import Header from "../components/Header";
import Home from "../components/Home";
import Movie from "../components/Movie";
import MovieList from "../components/MovieList";
import withData from "../lib/withData";

export default withData(({ url }) => (
  <App>
    <Header pathname={url.pathname} />
    <div>
      {url.query.id ? <Movie id={url.query.id} /> : <Home />}
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
));
