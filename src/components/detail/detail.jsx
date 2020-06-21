import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { detail } from '../API';

class DetailTemplate extends Component {
    render() {
        return (
            <div className="main-add">
                <h1>{this.props.data.name}</h1>
                <img src={this.props.data.photo} alt={this.props.data.name} />
                <div className="info">
                    <p><h2>Description: </h2>{this.props.data.description}</p>
                    <p><h2>Price: </h2>{this.props.data.price}€</p>
                    <p><h2>Type: </h2>{this.props.data.type}</p>
                </div>
                <div className="created-updated">
                    <p type="date"><h5>Created: </h5>{this.props.data.createdAt}</p>
                    <p type="date"><h5>Last Updated: </h5>{this.props.data.updatedAt}</p>
                </div>
                <Link to="/apiv1/anuncios/"><button>Back to Menú</button></Link>
                <Link to="/apiv1/login/"><button>Log Out</button></Link>

            </div>
        );
    }
}

export default class Detail extends Component {
    state = {
        render: "",
    };
    checkStatus = () => {
        console.log(this.state.response);
        if (this.state.response.success) {
            this.setState({
                render: <DetailTemplate data={this.state.response.result} />
            });
        } else {
            alert('We cannot load the ad. You are being redirected.');
            window.location.pathname = "apiv1/anuncios";
        }
    };
    renderAd = async pageId => {
        this.setState({ response: await detail(pageId) });
        this.checkStatus();
    };
    componentDidMount() {
        let pageId = "";
        for (let i = 16; i < window.location.pathname.length; i++) {
            pageId += window.location.pathname[i];
        }
        this.renderAd(pageId);
    }
    render() {
        return <div>{this.state.render}</div>;
    }
}
