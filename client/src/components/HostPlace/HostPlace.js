import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HostPlaceService from '../../services/host-service';
import TextField from '@material-ui/core/TextField';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import './HostPlace.css';

class HostPlace extends Component {
    constructor() {
        super()
        this.state = {
            address:"",
            date:"",
            initialTime:"",
            finishingTime:"",
            price:"",
            capacity:"",
            location:{latitude:0,longitude:0},
            placeName:"",
            availability:"",
            concertRequest:"",
            redirect: false,
            clean:false
        }
        this.service = new HostPlaceService();
    }
    handleFormSubmit = (event) => {
        console.log(event);
        event.preventDefault();
        // const location ={};
        // location.longitude = -3.703790;
        // location.latitude = 40.416775;
        console.log(location);
        const { address, date,initialTime ,finishingTime,price, capacity,location,placeName,availability,concertRequest} = this.state;
     
        this.service.new( address,date,initialTime ,finishingTime,price, capacity,location,placeName,availability,concertRequest)
            .then(response => {
                console.log(response);
                this.setState({
                    address:"",
                    date:"",
                    initialTime:"",
                    finishingTime:"",
                    price:"",
                    capacity:"",
                    placeName:"", 
                    redirect: true,
                    clean:true
                });
            })
            .catch(error => console.log(error))
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    _suggestionSelect = (result, lat, lng, text)=> {
      console.log(this.state,"dentro del geocoder")
      console.log(result, lat, lng, text);
      this.state.location.latitude = parseFloat(lat);
      this.state.location.longitude = parseFloat(lng);
      this.state.address = result;
    }
    
    render() {
        return (
            <div>
                <h1>Add your nice Place</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <Grid direction='column' spacing={16} container alignItems='center'>
                        <Grid item>
                            <MapboxAutocomplete publicKey='pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg'
                                inputClass='search-input'
                                onSuggestionSelect={this._suggestionSelect}
                                country='es'
                                resetSearch={false}/>
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Address' type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Concert starts at' type="text" name="initialTime" value={this.state.initialTime} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Concert finishes at' type="text" name="finishingTime" value={this.state.finishingTime} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Price €/per person' type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Capacity' type="number" name="capacity" value={this.state.capacity} onChange={this.handleChange} />
                        </Grid>
                        {/* <Grid item>
                            <TextField placeholder='Location' type="text" name="location" value={this.state.location} onChange={this.handleChange} />
                        </Grid> */}
                        <Grid item>
                            <TextField placeholder='Name' type="text" name="placeName" value={this.state.placeName} onChange={this.handleChange} />
                        </Grid>
                        <Button variant="contained" color="primary" type="submit" value="Submit">Create Host Place</Button>
                    </Grid>
                   
                </form>
            </div>
        );
    }
}

export default HostPlace;

