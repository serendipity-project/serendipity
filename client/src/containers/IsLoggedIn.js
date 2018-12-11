import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth-service';

export default class IsLoggedIn extends Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService();
        this.state = {
            loading: true,
            toLogin: false,
            toHome: false,
            user: {}
        };
    }

    componentDidMount() {
        this.auth.loggedin()
            .then((res) => {
                this.setState({
                    loading: false,
                    user: res,
                });
                
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    toLogin: true,
                });
                console.log({ err })
            })
    }

    render() {
        const { user, loading, toLogin, toHome } = this.state;

        if (loading) return <div>Loading...</div>;
        if (toLogin) return <Redirect to='/register' />;
        if (toHome) return <Redirect to='/' />;
        if (user) return this.props.children(this.state.user);
    }
}
