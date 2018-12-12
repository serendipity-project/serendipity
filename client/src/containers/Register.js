import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';
import React, { Component } from 'react'

export default class Register extends Component {

  render() {
    return (
      <>
        <div>
            <h1>Singup</h1>
            <Signup />
        </div>
        <div>
            <h1>Login</h1>
            <Login />
        </div>
      </>
    )
  }
}
