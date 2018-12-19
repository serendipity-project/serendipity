import React, { Component } from "react";
import RequestButton from "./RequestButton";
import "./HostPlaceCards.css";

class HostPlaceCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      myPlaces: null
    };
    // console.log(this.props.place);

  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      myPlaces: this.props.place
    });
  }
  beautifyDate = (date) => {
    const dateConverted = new Date(date);
    return dateConverted.toDateString();
  }
  render() {

    const listOfPlaces = this.props.places || [];
    if (this.props.place) { listOfPlaces.push(this.props.place) }
    // if (this.props.place) {
    //   listOfPlaces = this.props.place
    // }
    return (
      <div className="host-places-cards-container">
        {listOfPlaces.map((places, i) => {
          if (places.availability) {
            return (
              <div className="card-host-place" key={i}>
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
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default HostPlaceCards;