import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import IsLoggedIn from '../../containers/IsLoggedIn';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Route, Switch} from 'react-router-dom';
import Profile from '../Profile/Profile';

export default class Home extends Component {
  render() {
    return (
        <IsLoggedIn>
            {(user) => {
                console.log({user});
                const name = user && user.username;
                return (
                <>
                <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" color="inherit">
                  Serendipity
                </Typography>
                {user.isMusician && 
                <Link to='/profile'>
                <Button>Profile</Button>
                </Link>
                }
                <Link to='/about'>
                <Button>ABOUT</Button>
                </Link>
                </Toolbar>
                </AppBar>
                  <Route exact path="/about" render={() => <Profile routename='about' />}/>
                  <Route exact path="/profile" render={() => <Profile routename='profile' />}/>
                {/* <h1>Home bitchies 🤘</h1>
                <span>{name}</span> */}
                </>
                );
            }}
        </IsLoggedIn>
    )
  }
}