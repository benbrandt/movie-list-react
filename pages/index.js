import React from "react";
import App from "../components/App";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import withData from "../lib/withData";

export default withData(props => (
  <App>
    <Header pathname={props.url.pathname} />
    <MovieList />
  </App>
));
