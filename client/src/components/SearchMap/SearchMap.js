import React, { Component } from 'react'

export default class SearchMap extends Component {
    constructor(props){
        super(props);
        this.state={
            city: ''
        }
    }
  render() {
    return (
      <form>
        <label>Ciudad</label>
        <input onChange={(e)=>this.props.filter(e)}/>
      </form>
    )
  }
}
