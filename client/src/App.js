import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Register from './containers/Register';
import { Route, Switch} from 'react-router-dom';

class App extends Component {  
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/register" render={() => <Register />}/>
          <Route path="/" render={() => <Home/>}/>
        </Switch>
      </div>

    );
  }
}

export default App;