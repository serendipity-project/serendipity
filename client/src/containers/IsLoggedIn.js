import React, { Component } from 'react'

export default class IsLoggedIn extends Component {
    constructor(){
        this.state({
            loading: false,
        });
    }

    componentDidMount(){
        this.auth.IsLoggedIn()
        .then()
        .catch()
    }

    render() {
        return this.props.children(data);
    }
    }
