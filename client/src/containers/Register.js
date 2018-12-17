import Signup from "../components/Signup/Signup";
import Login from "../components/Login/Login";
import React, { Component } from "react";
import logo from'../images/logo.png';
import "./Register.css";

export default class Register extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt=""/>
        <h1>Serendipity</h1>
        <div className="register-container">
          <div className="login-box">
            <h3>LOGIN</h3>
            <Login />
          </div>
          <div className="signup-box">
            <h3>SIGNUP</h3>
            <Signup />
          </div>
        </div>
      </div>
    );
  }
}
