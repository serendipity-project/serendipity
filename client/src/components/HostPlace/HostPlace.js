import React, { Component } from 'react';
import HostPlaceCards from './HostPlaceCards';
import HostPlaceForm from './HostPlaceForm'
import HostPlaceService from '../../services/host-service';
class HostPlace extends Component {
    constructor() {
        super()
        this.state = {}
        this.service = new HostPlaceService()
    }

    componentDidMount() {
        this.update();
    }
    update = () => {
        this.service.getAll()
            .then((response) => {
                // console.log(response.musician)
                this.setState({
                    listOfPlaces: response.hostPlace
                })
            })
            .catch((e) => console.log(e))
    }

    render() {
        return (
            <div>
                <HostPlaceCards places={this.state.listOfPlaces}/>
                <HostPlaceForm update={this.update}/>
            </div>
        );
    }
}

export default HostPlace;