import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './SearchMap.css';

export default class SearchMap extends Component {
    constructor(props){
        super(props);
        this.state={
            city: ''
        }
    }
  render() {
    return (
      <form className="form-search-concert">
        <h3>Search Concert</h3>
        <label>Location</label>
        <hr></hr>
        <TextField placeholder='Location'  name="searchCity" onChange={(e)=>this.props.filter(e)}/>
        <br/>
        <TextField placeholder='Date' type="date" name="searchDate" onChange={(e)=>this.props.filter(e)}/>
        <label>Genre</label>
        <TextField  placeholder='Genre'  name="searchGenre" onChange={(e)=>this.props.filter(e)}/>
      </form>
    )
  }
}
