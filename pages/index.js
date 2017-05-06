// @flow
import React from "react";
import Home from "../components/Home";
import ListView from "../components/ListView";
import withData from "../lib/withData";

export default withData(({ url }) => (
  <ListView>
    <Home />
  </ListView>
));
