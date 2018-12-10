import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import IsLoggedIn from '../../containers/IsLoggedIn';

export default class Home extends Component {
  render() {
    return (
        <IsLoggedIn>
            {(user) => {
                console.log({user});
                const name = user && user.username;
                return (
                <>
                <h1>Home bitchies 🤘</h1>
                <span>{name}</span>
                </>
                );
            }}
        </IsLoggedIn>
    )
  }
}