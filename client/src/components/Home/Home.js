import React, { Component } from 'react'
import IsLoggedIn from '../../containers/IsLoggedIn';
import AuthService from '../../services/auth-service';
import Navbar from '../Navbar/Navbar';


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
            </>
          );
        }}
      </IsLoggedIn>
    )
  }
}