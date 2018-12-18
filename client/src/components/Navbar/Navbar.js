import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom';
import Profile from '../Profile/Profile';
import AuthService from '../../services/auth-service';
import HostPlace from '../HostPlace/HostPlace';
import Mapbox from '../Mapbox/Mapbox';
import Musician from '../Musician/Musician';
import EditProfile from '../Profile/EditProfile';
import Requests from '../Requests/Requests'
import './Navbar.css'
import MyConcerts from '../Concerts/MyConcerts';

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
                <nav className="nav-bar-guay"> 
                        <span className="nav-title">
                            SERENDIPITY
                        </span>
                        {(this.props.user.musician || this.props.user.host) ?
                            <>
                                <Link to='/musicians'>
                                    <Button>Musician</Button>
                                </Link>
                                <Link to="/host-places">
                                    <Button>Host</Button>
                                </Link>
                            </>
                            : null
                        }
                        {(this.props.user.host) ?
                            <>
                                <Link to='/requests'>
                                    <Button>Request</Button>
                                </Link>
                            </> : null}
                        <Link to='/concerts'>
                            <Button>Concert</Button>
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
                </nav>
                <Route exact path="/about" render={() => <Profile routename='about' />} />
                <Route exact path="/profile" render={() => <Profile user={this.props.user} routename='profile' />} />
                <Route exact path="/host-places" render={() => <HostPlace user={this.props.user} />} />
                <Route exact path="/concerts" render={() => <Mapbox user={this.props.user} />} />
                <Route exact path="/requests" render={() => <Requests user={this.props.user} />} />
                <Route exact path='/musicians' render={() => <Musician user={this.props.user} routename='musician' />} />
                <Route exact path='/edit-profile' component={EditProfile} />
                <Route exact path='/your-concerts' render={() => <MyConcerts user={this.props.user} />} />
            </>
        )
    }
}

export default Navbar;