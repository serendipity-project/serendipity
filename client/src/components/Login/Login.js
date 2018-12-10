import React, { Component } from 'react';
import AuthService from '../../auth/auth-service';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' ,redirect:false};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username,password} = this.state;

    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" ,redirect:true});
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    if(this.state && this.state.redirect){return <Redirect to ="/"/>}
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <label>Password:</label>
          <input name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          <input type="submit" value="Login" />
        </form>
        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    )
  }
}