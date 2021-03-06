import React, { Component } from 'react'
import AuthService from '../../services/auth-service'
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {ButtonRegister} from '../Styles/Buttons'



export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: '', email: '', host: false, musician: false, redirect: false
    }
    this.service = new AuthService();
  }


    handleFormSubmit = (event) => {
        console.log(event);
        event.preventDefault();
        const {username,password,email,host,musician} = this.state;
        this.service.signup(username,password,email,host,musician)
        .then( response => {
            console.log(response);
            this.setState({username: "", password: "",email: "",host:false,musician:false,redirect:true});
        })
        .catch( error => console.log(error) )
    }

  handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "host" || name === "musician") {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
    console.log(this.state)
  }


  render() {
    if (this.state && this.state.redirect) { return <Redirect to="/" /> }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <Grid direction='column' spacing={16} container alignItems='center'justify-content='center' >
          <Grid item>
            <TextField  placeholder='Name' type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </Grid>
          <Grid item>
            <TextField placeholder='password' type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </Grid>
          <Grid item>
            <TextField placeholder='email' type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </Grid>
          </Grid> 
          <Grid direction='column' spacing={16} container alignItems='center'justify-content='center' >
          <FormControlLabel
            control={
              <Switch
                onChange={this.handleChange}
                value={this.state.host}
                checked={this.state.host}
                color="primary"
                name="host"
              />
            }
            label="Do you wanna Host?"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={this.handleChange}
                value={this.state.musician}
                checked={this.state.musician}
                color="primary"
                name="musician"
              />
            }
            label="Are you musician?"
          />
          <Grid item>
            <ButtonRegister variant="contained" color="primary" type="submit" value="Submit">SIGNUP</ButtonRegister>
          </Grid>
        </Grid>
      </form>
    )
  }
}