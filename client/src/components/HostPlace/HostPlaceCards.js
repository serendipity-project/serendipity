<<<<<<< HEAD
import React, { Component } from 'react';
import HostPlaceService from '../../services/host-service';
import { Card } from '@material-ui/core';
import RequestButton from './RequestButton';

class HostPlaceCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.service = new HostPlaceService();
    }
    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }
    render() {
        const listOfPlaces = this.props.places || [];
        return (
            <div>
                {listOfPlaces.map((places, i) => {
                    return (
                        <Card key={i}>
                            <h3>{places.placeName}</h3>
                            <h6>{places.address}</h6>
                            <h6>{places.initialTime}</h6>
                            <h6>{places.finishingTime}</h6>
                            {this.props.user.musician && <RequestButton user={this.props.user} placeID={places._id} />}

                        </Card>
                    )
                })}
            </div>
        );
    }
=======
import React, { Component } from "react";
import { Card } from "@material-ui/core";
import RequestButton from "./RequestButton";
import "./HostPlaceCards.css";

class HostPlaceCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }
  beautifyDate= (date)=>{
      const dateConverted = new Date(date);
      return dateConverted.toDateString();
  }
  render() {
   
    const listOfPlaces = this.props.places || [];
    if(this.props.place){listOfPlaces.push(this.props.place)}
    return (
      <div className="host-places-cards-container">
        {listOfPlaces.map((places,i) => {
          return (
            <Card key={i} className="card-host-place">
              <h3>{places.placeName}</h3>
              <h4>{places.address}</h4>
              <h4>{places.initialTime}h</h4>
              <h4>{places.finishingTime}h</h4>
              <h4>Date: {this.beautifyDate(places.date)}</h4>
              <div className="numbers-container">
                <span className="number">{places.capacity} </span><span>CAPACITY</span>
                <span className="number">{places.price} </span><span>PRICE</span>
              </div>
              {this.props.user.musician && (
                <RequestButton user={this.props.user} placeID={places._id} />
              )}
            </Card>
          );
        })}
      </div>
    );
  }
>>>>>>> b97770496ac71ef36b405d00c71ae43e4a3428eb
}

export default HostPlaceCards;