import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { login } from "../API";

export default class LogIn extends Component {
    state = {
        user: "",
        password: "",
        response: null,
        error: "",
        msg: "",
        currenPath: window.location.pathname
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
            response: await login(this.state.user, this.state.password)
        });
        if (this.state.response.success === false) {
            this.setState({ error: this.state.response.error });
            alert(this.state.error);
        } else if (this.state.response.success === true) {
            window.location.pathname = "apiv1/anuncios";
        } else alert("Unknow error. Please try again later.");
    };


    render() {
        const { user, password, registerPath } = this.state;

        return (
            <div className="log-in">
                <h2>Let's LOG IN!</h2>
                <form onSubmit={this.submitAndAlert}>
                    <p>
                        Insert your User or Email: <input
                            user={user}
                            onChange={this.typeUser} />
                    </p>
                    <p>
                        Insert your Password: <input type="password"
                            password={password}
                            onChange={this.typePassword} />
                    </p>
                    <button value="Submit">Log In</button>
                </form>
                <br />
                <div>
                    <p>Still don't have an account?</p>
                    <Link to="/apiv1/register">Register Here!</Link>
                </div>
            </div>
        );
    }
}
