import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import HostPlaceService from '../../services/host-service';
import TextField from '@material-ui/core/TextField';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import './HostPlaceForm.css'

class HostPlace extends Component {
  constructor(props) {
      super(props)
      this.state = {
          hostID: "",
          address: "",
          date: "",
          initialTime: "",
          finishingTime: "",
          price: "",
          capacity: "",
          location: { latitude: 0, longitude: 0 },
          placeName: "",
          availability: "",
          concertRequest: "",
          redirect: false,
          clean: false
      }
      this.service = new HostPlaceService();
  }
  componentDidMount() {
      this.state.hostID = this.props.user._id
      // this.setState = ({ hostID: this.props.user._id })
  }


  handleFormSubmit = event => {
    event.preventDefault();

    const {
      hostID,
      address,
      date,
      initialTime,
      finishingTime,
      price,
      capacity,
      location,
      placeName,
      availability,
      concertRequest
    } = this.state;

    this.service
      .new(
        hostID,
        address,
        date,
        initialTime,
        finishingTime,
        price,
        capacity,
        location,
        placeName,
        availability,
        concertRequest
      )
      .then(response => {
        this.setState(
          {
            hostID: "",
            address: "",
            date: "",
            initialTime: "",
            finishingTime: "",
            price: "",
            capacity: "",
            location: { latitude: 0, longitude: 0 },
            placeName: "",
            redirect: true,
            clean: true
          },
          () => {
            this.props.update(response.hostID);
          }
        );
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  _suggestionSelect = (result, lat, lng, text) => {
    this.state.location.latitude = parseFloat(lat);
    this.state.location.longitude = parseFloat(lng);
    this.state.address = result;
  };
  onChangeDate = (date: Date) => {
    this.setState({ date });
  };
  onChangeTime = e => {
    console.log(e);
    // this.setState({ time })
  };

  render() {
    // console.
    return (
      <div className="form-out-box">
        <div className="form-host-place-box">
          <h1 className="title">Add your nice Place for a concert</h1>
          <form
            onSubmit={this.handleFormSubmit}
            className="form-add-host-place"
          >
            <div className="box">
              <MapboxAutocomplete
                className="inp1"
                publicKey="pk.eyJ1IjoiZGRpZXpyIiwiYSI6ImNqb3ZuMGZ3cjFqa2YzcWxrYjBtNjJzaG4ifQ.cCFZkl39Hov3D-Ujeq74Cg"
                inputClass="search-input"
                type="search"
                onSuggestionSelect={this._suggestionSelect}
                country="es"
                resetSearch={false}
              />
              <TextField
                className="inp2"
                placeholder="Address"
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
            <div className="box">
              <TextField
                label="Starting Time"
                type="time"
                name="initialTime"
                value={this.state.initialTime}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                label="Finishing Time"
                type="time"
                name="finishingTime"
                value={this.state.finishingTime}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className="box">
              <TextField
                placeholder="Price €/per person"
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <TextField
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </div>
            <div className="box">
              <TextField
                placeholder="Capacity"
                type="number"
                name="capacity"
                value={this.state.capacity}
                onChange={this.handleChange}
              />
              <TextField
                placeholder="Name"
                type="text"
                name="placeName"
                value={this.state.placeName}
                onChange={this.handleChange}
              />
            </div>
            <div className="box">
              {/* {this.props.user.hostPlaceID ? (
                <Button
                  disabled
                  type="submit"
                  value="Submit"
                >
                  Create Host Place
                </Button>
              ) : ( */}
                  <Button
                    type="submit"
                    value="Submit"
                  >
                    Create Host Place
                </Button>
                {/* )} */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default HostPlace;
