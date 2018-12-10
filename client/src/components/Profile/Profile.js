import React, { Component } from "react";
import AuthService from '../../auth/auth-service';


class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.authService = new AuthService();
    this.state={
        user:null
    }

  }

  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null }));
  };

  componentDidMount() {
    this.authService
      .loggedin()
      .then(res =>{this.setState({...this.state,  user:res});console.log(res)})
      .catch(err => console.log(err));
  }

  render() {
    return this.state.user ? (
      <div>
        <h1> Profile Details </h1>
        <button onClick={this.logout}>Logout</button>
        <ul>
            <li><span>Username: </span>{this.state.user.username}</li>
            <li><span>email: </span>{this.state.user.course}</li>
        </ul>
      
       
      </div>
    ) : (
      <h1>No logedin</h1>
    );
  }
}

export default Profile;