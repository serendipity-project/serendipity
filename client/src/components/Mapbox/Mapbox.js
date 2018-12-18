import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import React, { Component } from "react";
import ConcertService from "../../services/concerts-service";
import SearchMap from "../SearchMap/SearchMap"
import styled from 'styled-components';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg"
});
const Zoom = [10];
const mapStyle = { height: "100vh", width: "100vw", display: "flex" };
const styles = { dark: "mapbox://styles/mapbox/dark-v9" };
const center = [-3.70379, 40.416775];

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

export default class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      allConcerts: null,
      filteredConcerts: [],
      concert: null,
    };
    this.service = new ConcertService();
  }

  filterConcerts = (e) => {
    //console.log(e.target.value,'---------------');

    const filtered = [...this.state.allConcerts];
    let newfiltered = filtered.filter((concert) => {
      return concert.hostID.address.includes(e.target.value);
    })
    this.setState({ filteredConcerts: newfiltered });

  }

  componentDidMount() {
    this.service
      .getAll()
      .then(response => {
        console.log(response);
        this.setState(
          {
            allConcerts: [...response],
            filteredConcerts: [...response]
          }
        );
      })
      .catch(e => console.log(e));
    this.setState({ user: this.props.user })
  }


  markerClick = (concert, feature) => {
    console.log(concert, "DENTRO DE MARKER CLICK")
    this.setState({
      // center: feature.geometry.coordinates,
      // zoom: [14],
      concert
    });
  };
  onClickGoingConcert = (e) => {
    this.service
      .going(this.state.concert._id)
      .then(response => {
        console.log(response.concert);
        this.setState(
          {
            concert: response.concert
          }
        );
      })
      .catch(e => console.log(e));

  }
  onClickNotGoingConcert = (e) => {
    this.service
      .notGoing(this.state.concert._id)
      .then(response => {
        console.log(response.concert);
        this.setState(
          {
            concert: response.concert
          }
        );
      })
      .catch(e => console.log(e));

  }

  render() {
    const { concert } = this.state;
    // console.log(concert); 
    if (this.state.allConcerts || this.state.filteredConcerts) {
      return (
        <>
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
              <Popup key={concert.availability} coordinates={[
                concert.hostID.location.longitude,
                concert.hostID.location.latitude

              ]}>
                <StyledPopup>
                  <div>
                    <h1>Concert Place in {concert.hostID.placeName}</h1>
                    <p>Capacidad:{concert.capacity}</p>
                    <p>{concert.hostID.price}</p>
                    <p>{concert.hostID.address}</p>
                    <p>{concert.hostID.date}</p>
                    <p>{concert.hostID.finishingTime}</p>
                    <p>{concert.hostID.initialTime}</p>
                  </div>
                  <div>
                    <h1>{concert.musicianID.artistData}</h1>
                    <a href={concert.musicianID.musicTrack}>Music Track</a>
                    <img src={concert.musicianID.image} />
                    <p>{concert.musicianID.artistData}</p>
                    <p>{concert.musicianID.instruments[0]}</p>
                  </div>
                  <div>
                    <button className="btn-go-concert" onClick={this.onClickGoingConcert} >+</button>
                    <button className="btn-go-concert" onClick={this.onClickNotGoingConcert} >-</button>
                  </div>
                </StyledPopup>
              </Popup>
            )}
          </Map>
        </>
      );
    } else {
      return <p>Loading map...</p>;
    }
  }
}
