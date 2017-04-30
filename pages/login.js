// @flow
import React from "react";
import App from "../components/App";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import withData from "../lib/withData";

export default withData(({ url }) => (
  <App>
    <Header pathname={url.pathname} />
    <LoginForm login />
  </App>
));
