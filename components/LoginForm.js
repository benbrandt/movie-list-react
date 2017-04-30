// @flow
import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { gql, graphql } from "react-apollo";

type Props = {
  login: boolean,
  data: {
    user: ?{
      id: string,
      signinUser: {
        token: ?string
      }
    }
  },
  createUser: variables => void,
  signinUser: variables => void
};

class LoginForm extends Component {
  props: Props;

  state = { email: "", password: "" };

  handleFieldChange = (event: Event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signinUser = () => {
    this.props
      .signinUser({ variables: this.state })
      .then(response => {
        localStorage.setItem("graphcoolToken", response.data.signinUser.token);
        Router.push({ pathname: "" });
      })
      .catch(e => {
        console.error(e);
        Router.push({ pathname: "" });
      });
  };

  createUser = () => {
    this.props
      .createUser({ variables: this.state })
      .then(response => {
        this.signinUser();
      })
      .catch(e => {
        console.error(e);
        Router.push({ pathname: "" });
      });
  };

  submitForm = (event: Event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      if (this.props.login) {
        this.signinUser();
      } else {
        this.createUser();
      }
    }
  };

  render() {
    const { login, data } = this.props;
    // redirect if user is logged in
    if (data.user) {
      console.warn("already logged in");
      Router.push({ pathname: "" });
    }

    return (
      <div className="form">
        <form>
          <fieldset>
            <legend>{login ? "Login" : "Create an Account"}</legend>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
            </div>
          </fieldset>
          <div>
            <button
              type="submit"
              disabled={!this.state.email || !this.state.password}
              onClick={this.submitForm}
            >
              {login ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="link">
            <Link href={login ? "/signup" : "/login"}>
              <a>{login ? "Sign Up" : "Login"}</a>
            </Link>
          </div>
        </form>

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
            font-size: 1rem;
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

          .email {
            margin-top: 1rem;
          }

          .link {
            line-height: 1.5;
            margin-top: 1.5rem;
          }

          .form {
            padding: 2rem;
          }
        `}</style>
      </div>
    );
  }
}

const createUser = gql`
  mutation ($email: String!, $password: String!) {
    createUser(
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }
  }
`;

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(
      email: {
        email: $email,
        password: $password
      }
    ) {
      token
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(createUser, { name: "createUser" })(
  graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
    graphql(signinUser, { name: "signinUser" })(LoginForm)
  )
);
