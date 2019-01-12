import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import React, { Component } from "react";
import ConcertService from "../../services/concerts-service";
import SearchMap from "../SearchMap/SearchMap";
import styled from "styled-components";
import "./Mapbox.css";
import { Button } from "@material-ui/core";
import FaPlus from "react-icons/lib/fa/plus";
import FaMinus from "react-icons/lib/fa/minus";
import FaClose from "react-icons/lib/fa/close";
import LocationIcon from "react-icons/lib/fa/map-marker";
import FaClockO from "react-icons/lib/fa/clock-o";
import iconLocation from "./images/location1.png";
import Modal from 'react-responsive-modal';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg"
});
const Zoom = [5];
const mapStyle = { height: "92vh", width: "85vw", display: "flex" };
const styles = { dark: "mapbox://styles/mapbox/dark-v9" };
const center = [-3.70379, 40.416775];

const StyledPopup = styled.div`
  background: white;
`;

export default class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      allConcerts: null,
      filteredConcerts: [],
      concert: null,
      searchCity: "",
      searchDate: "",
      searchGenre: "",
      open: false
    };
    this.service = new ConcertService();
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  filterConcerts = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const filtered = [...this.state.allConcerts];
      const newfiltered = filtered.filter(concert => {
        const date = this.state.searchDate.toLowerCase();
        const genre = this.state.searchGenre.toLowerCase();
        const city = this.state.searchCity.toLowerCase();
        if (date === "" && genre === "") {
          return concert.hostID.address.toLowerCase().includes(city); //FILTER PLACE NAME
        } else if (city === "" && genre === "") {
          return concert.hostID.date.includes(date); //FILTER DATE
        } else if (city === "" && date === "") {
          return concert.musicianID.musicStyle
            .toString()
            .toLowerCase()
            .includes(genre);
        } else if (city === "") {
          return (
            concert.musicianID.musicStyle
              .toString()
              .toLowerCase()
              .includes(genre) && concert.hostID.date.includes(date)
          );
        } else if (date === "") {
          return (
            concert.musicianID.musicStyle
              .toString()
              .toLowerCase()
              .includes(genre) &&
            concert.hostID.address.toLowerCase().includes(city)
          );
        } else if (genre === "") {
          return (
            concert.hostID.date.includes(date) &&
            concert.hostID.address.toLowerCase().includes(city)
          );
        } else {
          return (
            concert.hostID.address.toLowerCase().includes(city) &&
            concert.hostID.date.includes(date) &&
            concert.musicianID.musicStyle
              .toString()
              .toLowerCase()
              .includes(genre)
          );
        }
      });
      this.setState({ filteredConcerts: newfiltered });
    });
  };

  componentDidMount() {
    this.service
      .getAll()
      .then(response => {
        console.log(response);
        this.setState({
          allConcerts: [...response],
          filteredConcerts: [...response]
        });
      })
      .catch(e => console.log(e));
    this.setState({ user: this.props.user });
  }

  markerClick = (concert, feature) => {
    console.log(concert, "DENTRO DE MARKER CLICK");

    this.setState(
      {
        // center: feature.geometry.coordinates,
        // zoom: [14],
        concert
      },
      () => (document.querySelector(".mapboxgl-popup").style.display = "flex")
    );
  };
  onClickGoingConcert = e => {
    this.service
      .going(this.state.concert._id)
      .then(response => {
        this.onOpenModal()
        // console.log(response.concert);
        this.setState({
          concert: response.concert
        });
      })
      .catch(e => console.log(e));
  };
  onClickNotGoingConcert = e => {
    this.service
      .notGoing(this.state.concert._id)
      .then(response => {
        // console.log(response.concert);

        this.setState({
          concert: response.concert
        });
      })
      .catch(e => console.log(e));
  };
  closePopup = e => {
    // console.log(e);
    document.querySelector(".mapboxgl-popup").style.display = "none";
  };
  beautifyDate = date => {
    const dateConverted = new Date(date);
    return dateConverted.toDateString();
  };

  render() {
    const { concert } = this.state;
    // console.log(concert);
    if (this.state.filteredConcerts) {
      const image = new Image(17, 17);
      image.src = iconLocation;
      const images = ["myLocation", image];
      return (
        <div className="map-container">
          <SearchMap filter={this.filterConcerts} />
          <Map
            style={styles.dark}
            zoom={Zoom}
            containerStyle={mapStyle}
            center={center}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "myLocation" }}
              images={images}
            >
              {this.state.filteredConcerts.map(concert => {
                return (
                  <Feature
                    key={concert}
                    coordinates={[
                      concert.hostID.location.longitude,
                      concert.hostID.location.latitude
                    ]}
                    //   onClick={e => this.onClickCircle(e, concert)}
                    onClick={this.markerClick.bind(this, concert)}
                  />
                );
              })}
            </Layer>
            {concert !== null && (
              <Popup
                key={concert._id}
                offset={{
                  "bottom-left": [12, -38],
                  "bottom": [0, -38],
                  "bottom-right": [-12, -38]
                }}
                coordinates={[
                  concert.hostID.location.longitude,
                  concert.hostID.location.latitude
                ]}
              >
                <StyledPopup className="pop-up-container">
                  <div>
                    <img src={concert.musicianID.image} />
                  </div>
                  <div className="sub-pop-up">
                    <div className="name-close-container">
                      <h1 className="artist-name">
                        {concert.musicianID.artistData}
                      </h1>
                      <Button onClick={this.closePopup}>
                        <FaClose />
                      </Button>
                    </div>
                    <h3 className="adress">
                      <LocationIcon className='location-icon' />
                      {concert.hostID.address}
                    </h3>
                    <h3 className="adress">{concert.hostID.placeName}</h3>
                    <div className="time-style-container">
                      <div className="style-container">
                        <h4>Music Style</h4>
                        <p>
                          {concert.musicianID.musicStyle
                            .toString()
                            .replace(/,/g, " / ")
                            .toUpperCase()}
                        </p>
                      </div>
                      <div className="time-container">
                        <div>
                          <FaClockO />
                          <span>{concert.hostID.initialTime + `-`}</span>
                          <span>{concert.hostID.finishingTime}</span>
                        </div>
                        <div>
                          <span>{this.beautifyDate(concert.hostID.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="music-styles-container">
                      <h4>Instruments</h4>
                      <p>
                        {concert.musicianID.instruments
                          .toString()
                          .replace(/,/g, " / ")
                          .toUpperCase()}
                      </p>
                    </div>
                    <hr />
                    <div className="numbers-container">
                      <div>
                        <span className="number">{concert.capacity} </span>
                        <span className="letter">CAPACITY</span>
                      </div>
                      <div>
                        <span className="number">{concert.hostID.price}$ </span>
                        <span className="letter">PRICE</span>
                      </div>
                      <div>
                        {concert.availability ? (
                          <Button
                            className="btn-go"
                            onClick={this.onClickGoingConcert}
                          >
                            <FaPlus />
                          </Button>
                        ) : (
                            <Button
                              disabled="true"
                              className="btn-go"
                              onClick={this.onClickGoingConcert}
                            >
                              <FaPlus />
                            </Button>
                          )}
                        <Button
                          className="btn-not-go"
                          onClick={this.onClickNotGoingConcert}
                        >
                          <FaMinus />
                        </Button>
                      </div>
                    </div>
                  </div>
                </StyledPopup>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                  <h2>Great {this.state.user.username}, you are going to {concert.musicianID.artistData}'s concert on the {this.beautifyDate(concert.hostID.date)}</h2>
                </Modal>
              </Popup>
            )}
          </Map>
        </div>
      );
    } else {
      return <p>Loading map...</p>;
    }
  }
}