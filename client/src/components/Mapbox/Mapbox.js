import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import React, { Component } from "react";


const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg"
});
const Zoom = [10];
const mapStyle = { height: "100vh", width: "100vw", display: "flex" };
const styles = { dark: "mapbox://styles/mapbox/dark-v9" };
const center = [-3.70379, 40.416775];

const symbolLayout: MapboxGL.SymbolLayout = {
  'text-field': '{title}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
};

const circleLayout: MapboxGL.CircleLayout = { visibility: 'visible' };
const circlePaint: MapboxGL.CirclePaint = {
  'circle-color': 'white'
};
const symbolPaint: MapboxGL.SymbolPaint = {
  'text-color': 'white'
};

let geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-3.70376, 40.416775]
        },
        "properties": {
            "title": "Fieston en el salon de pepe",
            "icon": "monument"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-3.70376, 42.416772]
        },
        "properties": {
            "title": "Casa de Loli",
            "icon": "harbor"
        }
    }]
};

export default class Mapbox extends Component {
  constructor(props) {
    super(props);
  }
  onClickCircle = (evt: any) => {
    console.log(evt);
  };

  render() {
    return (
      <Map
        style={styles.dark}
        zoom={Zoom}
        containerStyle={mapStyle}
        center={center}
      >
       {/*  <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-3.70379, 40.416775]} />
        </Layer> */}

        <GeoJSONLayer
        data={geojson}
        circleLayout={circleLayout}
        circlePaint={circlePaint}
        symbolPaint={symbolPaint}
        symbolLayout={symbolLayout}
        circleOnClick={this.onClickCircle}
        />
      </Map> 
    );
  }
}



