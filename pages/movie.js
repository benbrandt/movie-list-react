// @flow
import React from "react";
import ListView from "../components/ListView";
import Movie from "../components/Movie";
import withData from "../lib/withData";

export default withData(({ url }) => (
  <ListView>
    <Movie id={url.query.id} />
  </ListView>
));
