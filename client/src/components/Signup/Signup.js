import React, { Component } from 'react'
import AuthService from '../../auth/auth-service';
import {Link, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default class Signup extends Component {
  constructor(props){
      super(props);
      this.state={
        username:'',password:'',email: '',host: false, musician: false,redirect:false
      }
      this.service = new AuthService();
  }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const {username,password,email,host} = this.state;
        this.service.signup(username,password,email,host)
        .then( response => {
            console.log(response);
            this.setState({...this.state,username: "", password: "",email: "",host:"",redirect:true});
        })
        .catch( error => console.log(error) )
    }

  handleChange = (e)=>{
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  render() {
      if(this.state && this.state.redirect){return <Redirect to ="/"/>}
    return (
     <form onSubmit={this.handleFormSubmit}>
     <Grid direction='column' spacing={16} container alignItems='center'>
     <Grid item>
     <TextField placeholder='Name' type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
     </Grid> 
    <Grid item>
    <TextField placeholder='password' type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
     </Grid>
     <Grid item>
     <Button variant="contained" color="primary" type="submit" value="Submit">Sing up</Button>
     </Grid>
     </Grid>
       {/*   <label>email:</label>
         <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
         <label>host:</label>
         <select type="text" name="host" value={this.state.host} onChange={this.handleChange}/> */}
     </form>
    )
  }
}