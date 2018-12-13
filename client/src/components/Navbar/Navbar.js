import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Route, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import AuthService from '../../services/auth-service';
import Musician from '../Musician/Musician';

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
        console.log(this.props.user);
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Serendipity
                        </Typography>
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
                <Route exact path='/musicians' render={() => <Musician routename='musician' />} />
                <Route exact path="/about" render={() => <Profile routename='about' />} />
                <Route exact path="/profile" render={() => <Profile user={this.props.user} routename='profile' />} />
            </>
        )
    }
}

export default Navbar;