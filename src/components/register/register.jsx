import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { register } from "../API";

export default class Register extends Component {
  state = {
    user: "",
    password: "",
    response: null,
    error: ""
  };
  typeUser = event => {
    this.setState({ user: event.target.value });
  };
  typePassword = event => {
    this.setState({ password: event.target.value });
  };
  clearStatus = e => {
    this.setState({
      user: "",
      password: ""
    });
  };
  submitAndAlert = async event => {
    event.preventDefault();
    this.setState({
      response: await register(this.state.user, this.state.password)
    });
    if (this.state.response.success === false) {
      this.setState({ error: this.state.response.error });
      alert(this.state.error);
    } else if (this.state.response.success === true) {
      alert(`Congratulations! The user "${this.state.user}" has been created`);
      window.location.pathname = "apiv1/login";
    } else alert("Unknow error. Please try again later.");
  };

  render() {
    const { user, password } = this.state;
    return (
      <div className="register">
        <h2>Let's REGISTER!</h2>
        <form onSubmit={this.submitAndAlert}>
          <p>
            Insert your User or Email:
            <input user={user} onChange={this.typeUser} />
          </p>
          <p>
            Insert your Password:
            <input type="password" password={password} onChange={this.typePassword} />
          </p>
          <button value="Submit">Submit</button>
        </form>
        <br />
        <div>
          <Link to="/apiv1/login">Or Log In Here</Link>
        </div>
      </div>
    );
  }
}
