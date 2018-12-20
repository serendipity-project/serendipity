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
      searchGenre: ""
    };
    this.service = new ConcertService();
  }

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
        console.log(response.concert);
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
        console.log(response.concert);
        this.setState({
          concert: response.concert
        });
      })
      .catch(e => console.log(e));
  };
  closePopup = e => {
    console.log(e);
    document.querySelector(".mapboxgl-popup").style.display = "none";
  };

  render() {
    const { concert } = this.state;
    // console.log(concert);
    if (this.state.filteredConcerts) {
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
              layout={{ "icon-image": "marker-15" }}
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
                // key={concert.availability}
                offset={{
                  "bottom-left": [12, -38],
                  bottom: [0, -38],
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
                  <div>
                    <button onClick={this.closePopup}>X</button>
                    <h1>{concert.musicianID.artistData}</h1>
                    <h1>{concert.hostID.placeName}</h1>
                    <p>{concert.capacity}</p>
                    <p>{concert.hostID.price}</p>
                    <p>{concert.hostID.address}</p>
                    <p>{concert.hostID.date}</p>
                    <p>{concert.hostID.finishingTime}</p>
                    <p>{concert.hostID.initialTime}</p>
                  </div>
                  <div>
                    <div>
                      {concert.musicianID.musicStyle.map(s => (
                        <span>{s}</span>
                      ))}
                    </div>
                    <a href={concert.musicianID.musicTrack}>Music Track</a>
                    <p>{concert.musicianID.artistData}</p>
                    <p>{concert.musicianID.instruments[0]}</p>
                  </div>
                  <div className="numbers-container">
                    <div>
                      <span className="number">{concert.capacity} </span>
                      <span>CAPACITY</span>
                    </div>
                    <div>
                      <span className="number">{concert.price}$ </span>
                      <span>PRICE</span>
                    </div>
                    <div>
                      {concert.availability ? (
                        <Button
                          className="btn-concert btn-go"
                          onClick={this.onClickGoingConcert}
                        >
                          <FaPlus />
                        </Button>
                      ) : (
                        <Button
                          disabled="true"
                          className="btn-concert btn-go"
                          onClick={this.onClickGoingConcert}
                        >
                          <FaPlus />
                        </Button>
                      )}
                      <Button
                        className="btn-concert btn-not-go"
                        onClick={this.onClickNotGoingConcert}
                      >
                        <FaMinus />
                      </Button>
                    </div>
                  </div>
                </StyledPopup>
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
