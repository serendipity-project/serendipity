import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile'
import { Route, Switch} from 'react-router-dom';


class App extends Component {

    constructor(props){
      super(props)
      this.state = { loggedInUser: null };
    }
    

    getTheUser(userObj){
      this.setState({loggedInUser: userObj})
    }
    
  render() {
    const getTheUser = (userObj) => this.getTheUser(userObj);
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Home/>}/>
          <Route exact path="/profile" render={() => <Profile/>}/>
          <Route exact path="/signup" render={() => <Signup getUser={getTheUser}/>}/>
          <Route exact path="/login" render={() => <Login getUser={getTheUser}/>}/>
          {/* <Route exact path="/register" render={() => <Register getUser={getTheUser}/>}/> */}

        </Switch>

       {/*  if(this.state.islogged){<rediect></rediect>}else{} */}
      </div>

    );
  }
}

export default App;