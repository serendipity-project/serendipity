import React, { Component } from "react";
import AuthService from '../../auth/auth-service';
import Typography from '@material-ui/core/Typography';


class Profile extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.authService = new AuthService();
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
    // console.log(this.props.user);
    const { routename } = this.props;
    return this.state.user ? (
      <>
        <Typography variant="h6" color="inherit">
          {`this is the ${routename}`}
        </Typography>
        <div>
          <h1> Profile Details </h1>
          <ul>
            <li><span>Username: </span>{this.state.user.username}</li>
            <li><span>email: </span>{this.state.user.email}</li>
          </ul>


        </div>
      </>
    ) : (
        <h1>No logedin</h1>
      );
  }
}

export default Profile;