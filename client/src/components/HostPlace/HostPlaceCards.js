import React, { Component } from "react";
import HostPlaceService from "../../services/host-service";
import { Card } from "@material-ui/core";
import RequestButton from "./RequestButton";
import "./HostPlaceCards.css";

class HostPlaceCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.service = new HostPlaceService();
  }
  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }
  render() {
    const listOfPlaces = this.props.places || [];
    return (
      <div className="host-places-cards-container">
        {listOfPlaces.map((places,i) => {
          return (
            <Card key={i} className="card-host-place">
              <h3>{places.placeName}</h3>
              <h4>{places.address}</h4>
              <h4>{places.address}</h4>
              <hr />
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
}

export default HostPlaceCards;
