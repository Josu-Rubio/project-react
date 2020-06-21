import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ads } from "../API";

const BUY = [
    { id: "", name: "None" },
    { id: "compra", name: "Buy" },
    { id: "venta", name: "Sell" }
];

const TAGS = [
    { id: "", name: "None" },
    { id: "Work", name: "Work" },
    { id: "Mobile", name: "Mobile" },
    { id: "iLifestyle", name: "Lifestyle" },
    { id: "Motor", name: "Motor" }
]

class MakeAnAdd extends Component {
    render() {
        return (
            <div className="ad">
                <div>
                    <p className="ad-name">{this.props.data.name}</p>
                    <p className="ad-price">{this.props.data.price}€</p>
                </div>
                <Link to={`/apiv1/anuncios/${this.props.data._id}`}>
                    <img src={this.props.data.photo} alt={this.props.data.name} /></Link>
            </div>
        )
    }
}

let ListAds = (e) => {
    let adList = [];
    const callingApi = e.callingApi;
    if (callingApi) {
        for (let i = 0; i < e.data.count; i++) {
            adList.push(<MakeAnAdd key={i} data={e.data.results[i]} />);
        }
        return <div className="ad-list">{adList}</div>
    }
    return null;
}

const queryInfo = (search, buy, tag, minPrice, maxPrice) => {
    let query = '';
    if (search !== '') { query = `?name=${search}` }
    if (minPrice !== '' || maxPrice !== '') {
        if (query === '' && minPrice < maxPrice) {
            query = `?price=${minPrice}-${maxPrice}`
        } else if (query !== '' && minPrice < maxPrice) {
            query = `&price=${minPrice}-${maxPrice}`
        } else { alert(`Maximum price cannot be lower than minmum price!`) }
    }
    if (tag !== '') {
        if (query === '') { query = `?tag=${tag}` }
        else { query = `${query}&tag=${tag}` }
    }
    if (buy !== '') {
        if (buy === 'venta') {
            if (query === '') { query = '?venta=true' }
            else { query = `${query}&venta=true` }

        }
        else {
            if (query === '') { query = '?venta=false' }
            else { query = `${query}&venta=false` }
        }
    }
    console.log(query);
    return query;
}

export default class Home extends Component {
    state = {
        response: null,
        renderInfoTags: null,
        search: "",
        minPrice: "",
        maxPrice: "",
        tag: TAGS[0].id,
        buy: BUY[0].id,
    }
    searchInput = event => {
        this.setState({
            search: event.target.value
        })
    }
    addMinPrice = event => {
        this.setState({
            minPrice: event.target.value
        })
    }
    addMaxPrice = event => {
        this.setState({
            maxPrice: event.target.value
        })
    }
    selectTag = event => {
        this.setState({
            tag: event.target.value
        })
    }
    selectBuy = event => {
        this.setState({
            buy: event.target.value
        })
    }
    checkStatus = (response) => {
        if (this.state.response.success === false) {
            alert("You have lost connection. Please log in again");
            window.location.pathname = "/apiv1/login";
        } else if (this.state.response.success === true) {
            this.setState({ renderInfoTags: true });
        } else {
            alert("Ooops! Theres's an error. Try logging in again");
            window.location.pathname = "/apiv1/login";
        }
    }
    bringAds = async () => {
        this.setState({
            response: await ads(queryInfo(
                this.state.search,
                this.state.buy,
                this.state.tag,
                this.state.minPrice,
                this.state.maxPrice,
            ))
        })
        this.checkStatus();
    }
    componentDidMount = () => {
        this.bringAds();
    }
    submitFilter = event => {
        event.preventDefault();
        this.setState({ renderInfoTags: false });
        this.setState({ response: null });
        this.bringAds();
    }

    render() {
        const { search, minPrice, maxPrice, buy, tag } = this.state;
        return (
            <div>
                <div >
                    <form className="filter" onSubmit={this.submitFilter}>
                        <p>Search: </p>
                        <input type="text" search={search} onChange={this.searchInput} />
                        <p>Select minimum and maximum price: </p>
                        <input className="min" type="number" minprice={minPrice} onChange={this.addMinPrice} />
                        <input className="max" type="number" maxprice={maxPrice} onChange={this.addMaxPrice} />
                        <p>Tag filter: </p>
                        <select tag={tag} onChange={this.selectTag}>
                            {TAGS.map(tag => (
                                <option value={tag.id}>{tag.name}</option>
                            ))}</select>
                        <p>Sell or Buy? </p>
                        <select buy={buy} onChange={this.selectBuy}>
                            {BUY.map(buy => (
                                <option value={buy.id}>{buy.name}</option>
                            ))}</select>
                        <br />
                        <button value="Submit">Filter</button>
                        <div className="log-out">
                            <Link to="/apiv1/login"><button>Log Out</button></Link>
                        </div>
                    </form>
                </div>
                <div>
                    <ListAds callingApi={this.state.renderInfoTags} data={this.state.response} />
                </div>
            </div>

        )
    }
}
