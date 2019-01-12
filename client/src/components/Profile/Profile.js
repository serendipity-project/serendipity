import React, { Component } from "react";
import AuthService from '../../services/auth-service'
import { Link } from 'react-router-dom'
import './Info.css'
import HostPlaceInfo from './HostPlaceInfo'
import MusicianInfo from './MusicianInfo'
import { Button } from "@material-ui/core";
class Profile extends Component {

  constructor(props) {
    super(props)
    this.authService = new AuthService()
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.authService
      .loggedin()
      .then(res => { this.setState({ ...this.state, user: res }); console.log(res) })
      .catch(err => console.log(err));
  }

  render() {
    // const { routename } = this.props;
    return this.state.user ? (
      <>
        <h1> Profile Details </h1>
        <div>
          {this.state.user.host && <HostPlaceInfo user={this.props.user} />}
          {this.state.user.musician && <MusicianInfo user={this.props.user} />}
        </div>
        <Link to="/edit-profile"><Button className='edit-btn'>Edit Profile</Button></Link>
      </>
    ) : (<h1>No logedin</h1>)
  }

}

export default Profile;