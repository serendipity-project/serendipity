import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './SearchMap.css';

export default class SearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }
  render() {
    return (
      <form className="form-search-concert">
        <h3>Find Your Concert</h3>
        <hr></hr>
        <TextField className='box' placeholder='Location' name="searchCity" onChange={(e) => this.props.filter(e)} />
        <br />
        <TextField className='box' placeholder='Date' type="date" name="searchDate" onChange={(e) => this.props.filter(e)} />
        <TextField className='box' placeholder='Genre' name="searchGenre" onChange={(e) => this.props.filter(e)} />
      </form>
    )
  }
}
