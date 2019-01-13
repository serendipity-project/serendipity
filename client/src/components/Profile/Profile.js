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
      .then(res => { this.setState({ ...this.state, user: res })})
      .catch(err => console.log(err));
  }

  render() {
    // const { routename } = this.props;
    const user = this.state.user
    return user ? (
      <>
        <h1> Profile Details </h1>
        {!user.host && !user.musician &&
          <>
            <span className='titles'>USERNAME</span>
            <p className='info-1'>{user.username.toUpperCase()}</p>
            <span className='titles'>EMAIL</span>
            <p className='info-1'>{user.email.toUpperCase()}</p>
          </>
        }
        <div>
          {user.host && <HostPlaceInfo user={this.props.user} />}
          {user.musician && <MusicianInfo user={this.props.user} />}
        </div>
        <Link to="/edit-profile"><Button className='edit-btn'>Edit Profile</Button></Link>
      </>
    ) : (<h1>No logedin</h1>)
  }
}

export default Profile;