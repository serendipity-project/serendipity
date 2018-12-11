import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GeneralService from '../../services/general-services';
import TextField from '@material-ui/core/TextField';

class HostPlace extends Component {
    constructor() {
        super()
        this.state = {
            address: '',
            date: '',
            price: '',
            capacity: '',
            placeName: '',
            redirect: false
        }
    }
    handleFormSubmit = (event) => {
        console.log(event);
        event.preventDefault();
        const { address, date, price, capacity, placeName } = this.state;
        this.service.signup(address, date, price, capacity, placeName)
            .then(response => {
                console.log(response);
                this.setState({ address: "", date: "", price: "", capacity: "", placeName: "", redirect: true });
            })
            .catch(error => console.log(error))
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <h1>Add a Location</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <Grid direction='column' spacing={16} container alignItems='center'>
                        <Grid item>
                            <TextField placeholder='Address' type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Price €/per person' type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Capacity' type="text" name="capacity" value={this.state.capacity} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Name' type="text" name="placeName" value={this.state.placeName} onChange={this.handleChange} />
                        </Grid>
                        <Button variant="contained" color="primary" type="submit" value="Submit">Create</Button>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default HostPlace;