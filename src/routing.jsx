import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import LogIn  from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';
import Detail from './components/detail/detail'

export default class Routing extends Component{
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/apiv1/login" component={LogIn} />
                        <Route path="/apiv1/register" component={Register} />
                        <Route exact path="/apiv1/anuncios" component={Home} />
                        <Route path="/apiv1/anuncios/:adId" component={Detail} />
                        <Route path="/" component={LogIn} />
                    </Switch>

                </div>
            </Router>
        );
    }
}
