import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import React, { Component } from "react";
import ConcertService from "../../services/concerts-service";
import styled from 'styled-components';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg"
});
const Zoom = [10];
const mapStyle = { height: "100vh", width: "100vw", display: "flex" };
const styles = { dark: "mapbox://styles/mapbox/dark-v9" };
const center = [-3.70379, 40.416775];

const symbolLayout: MapboxGL.SymbolLayout = {
  "text-field": "{title}",
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 0.6],
  "text-anchor": "top"
};

const circleLayout: MapboxGL.CircleLayout = { visibility: "visible" };
const circlePaint: MapboxGL.CirclePaint = {
  "circle-color": "white"
};
const symbolPaint: MapboxGL.SymbolPaint = {
  "text-color": "white"
};

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
      allConcerts: null,
      concert:null
    };
    this.service = new ConcertService();
  }
  onClickCircle = (evt: any, i) => {
    console.log(evt.target, i);
  };

  componentDidMount() {
    this.service
      .getAll()
      .then(response => {
        console.log(response);
        this.setState(
          {
            allConcerts: [...response]
          },
          () => console.log(this.state)
        );
        // console.log(this.state, 'dentro de getall')
      })
      .catch(e => console.log(e));
  }

 
 markerClick = (concert, feature) => {
     console.log(concert,"DENTRO DE MARKER CLICK")
  this.setState({
    // center: feature.geometry.coordinates,
    // zoom: [14],
    concert
  });
};


  render() {
    const { concert } = this.state;
    console.log(concert); 
    if (this.state.allConcerts) {
      return (
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
            {this.state.allConcerts.map(concert => {
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
          {concert!==null && (
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
                <img src={concert.musicianID.image}/>
                <p>{concert.musicianID.artistData}</p>
                <p>{concert.musicianID.instruments[0]}</p>
                </div>
              </StyledPopup>
            </Popup>
          )}

          {/* <GeoJSONLayer
        data={geojson}
        circleLayout={circleLayout}
        circlePaint={circlePaint}
        symbolPaint={symbolPaint}
        symbolLayout={symbolLayout}
        circleOnClick={(e)=>this.onClickCircle(e,this)}
        /> */}
        </Map>
      );
    } else {
      return <p>Loading map...</p>;
    }
  }
}


/* let geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-3.70376, 40.416775]
      },
      properties: {
        title: "Fieston en el salon de pepe",
        icon: "monument"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-3.70376, 42.416772]
      },
      properties: {
        title: "Casa de Loli",
        icon: "harbor"
      }
    }
  ]
}; */