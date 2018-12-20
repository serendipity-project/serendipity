import React, { Component } from "react";
import RequestButton from "./RequestButton";
import FaClockO from "react-icons/lib/fa/clock-o";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./HostPlaceCards.css";
import LeftArrow from "react-icons/lib/fa/angle-left";
import RightArrow from "react-icons/lib/fa/angle-right";

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
  beautifyDate = date => {
    console.log(date);
    const dateConverted = new Date(date);
    return dateConverted.toDateString();
  };
  render() {
    const listOfPlaces = this.props.places || [];
    if (this.props.place) {
        console.log(this.props.place);
      listOfPlaces.push(this.props.place);
    }
    return (
      <CarouselProvider
        naturalSlideWidth={200}
        naturalSlideHeight={130}
        visibleSlides={3}
        totalSlides={listOfPlaces.length}
      >
      <ButtonBack className='arrows'>
          <LeftArrow className='arrow-icon' />
      </ButtonBack>
      <ButtonNext className='arrows'><RightArrow className='arrow-icon' /></ButtonNext>
        <Slider>
          {listOfPlaces.map((places, i) => {
              console.log(places.hostID, this.props.user._id,"aaalksjdfosahfgdpadhspfg");
            if (places.availability || places.hostID === this.props.user._id) {
              return (
                <Slide>
                  <div className="card-host-place">
                    <div className="top-card">
                      <div>
                        <h2>{places.placeName}</h2>
                        <h1 className="address">{places.address}</h1>
                      </div>
                      <div className="date-container">
                        <h3>
                          <FaClockO />
                          {places.initialTime}-{places.finishingTime}
                        </h3>
                        <h3>{this.beautifyDate(places.date)}</h3>
                      </div>
                    </div>
                    <hr />
                    <div className="numbers-container">
                      <div>
                        <span className="number">{places.capacity} </span>
                        <span className='grey-titles'>CAPACITY</span>
                      </div>
                      <div>
                        <span className="number">{places.price}$ </span>
                        <span className='grey-titles'>PRICE</span>
                      </div>
                      <div>
                        {this.props.user.musician && (
                          <RequestButton
                            user={this.props.user}
                            placeID={places._id}
                          />
                        )}
                      </div>
                    </div>

                  </div>
                </Slide>
              );
            }
          })}
        </Slider>
      </CarouselProvider>
    );
  }
}

export default HostPlaceCards;
