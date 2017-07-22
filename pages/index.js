// @flow
import React from "react";
import Home from "../components/Home";
import ListView from "../components/ListView";
import Movie from "../components/Movie";
import withData from "../lib/withData";

export default withData(({ url }) =>
  <ListView>
    {url.query.id ? <Movie id={url.query.id} /> : <Home />}
  </ListView>
);
