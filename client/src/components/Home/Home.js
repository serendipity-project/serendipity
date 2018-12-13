import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import IsLoggedIn from '../../containers/IsLoggedIn';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Route, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import AuthService from '../../services/auth-service';
import Navbar from '../Navbar/Navbar';
import HostPlace from '../HostPlace/HostPlace';


export default class Home extends Component {
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

    return (
      <IsLoggedIn>
        {(user) => {
          // const username = user && user.username;
          return (
            <>
              <Navbar user={user}></Navbar>
              {user.host &&
              <>
               <HostPlace/>
               </>
              }
            </>
          );
        }}
      </IsLoggedIn>
    )
  }
}