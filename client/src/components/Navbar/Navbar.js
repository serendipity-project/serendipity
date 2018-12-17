import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Route, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import AuthService from '../../services/auth-service';
import HostPlace from '../HostPlace/HostPlace';
import Mapbox from '../Mapbox/Mapbox';
import Musician from '../Musician/Musician';
import EditProfile from '../Profile/EditProfile';
import Requests from '../Requests/Requests'
import './Navbar.css'

class Navbar extends Component {
    constructor() {
        super()
        this.authService = new AuthService();
        this.state = {
            user: null
        }
    }
    logout = () => {
        this.authService
            .logout()
            .then(() => this.setState({ user: null }));
    }
    render() {
        // console.log(this.props.user);
        return (
            <>
                <AppBar position="static">
                    <Toolbar className="nav-bar-guay">
                        <span color="black">
                            SERENDIPITY
                        </span>
                        {(this.props.user.musician || this.props.user.host) ?
                            <>
                                <Link to='/musicians'>
                                    <Button>Musicians</Button>
                                </Link>
                                <Link to="/host-places">
                                    <Button>Hosts</Button>
                                </Link>
                            </>
                            : null
                        }
                        {(this.props.user.host) ?
                            <>
                                <Link to='/requests'>
                                    <Button>Requests</Button>
                                </Link>
                            </> : null}
                        <Link to='/concerts'>
                            <Button>Concerts</Button>
                        </Link>
                        <Link to="/your-concerts">
                            <Button>Your Concerts</Button>
                        </Link>
                        <Link to='/about'>
                            <Button>About</Button>
                        </Link>
                        <Link to='/profile'>
                            <Button>Profile</Button>
                        </Link>
                        <Link to='/register'>
                            <Button onClick={this.logout}>Logout</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Route exact path="/about" render={() => <Profile routename='about' />} />
                <Route exact path="/profile" render={() => <Profile user={this.props.user} routename='profile' />} />
                <Route exact path="/host-places" render={() => <HostPlace user={this.props.user} />} />
                <Route exact path="/concerts" render={() => <Mapbox />} />
                <Route exact path="/requests" render={() => <Requests user={this.props.user}/>} />
                <Route exact path='/musicians' render={() => <Musician routename='musician'/>} />
                <Route exact path='/edit-profile' component={EditProfile} />
            </>
        )
    }
}

export default Navbar;