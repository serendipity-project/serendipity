/* import React, {Component} from 'react'
import Geocoder from 'react-mapbox-gl-geocoder'
import ReactMapGL from 'react-map-gl'
//import './index.css'
 
const mapAccess = {
    mapboxApiAccessToken:"pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg"
}
 
const mapStyle = {
    width: '100%',
    height: 600
}
 
const queryParams = {
    country: 'us'
}
 
export default class GeocoderPack extends Component {
    state = {
        viewport: {}
    }
 
    onSelected = (viewport, item) => {
        this.setState({viewport});
        console.log('Selected: ', item)
    }
 
    render() {
        const {viewport} = this.state
 
        return (
            <div>
                <Geocoder
                    {...mapAccess} onSelected={this.onSelected} viewport={viewport} hideOnSelect={true}
                    queryParams={queryParams}
                />
 
                <ReactMapGL
                    {...mapAccess} {...viewport} {...mapStyle}
                    onViewportChange={(newViewport) => this.setState({viewport: newViewport})}
                />
            </div>
        )
    }
} */