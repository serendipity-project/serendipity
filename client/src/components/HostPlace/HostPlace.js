import React, { Component } from 'react';
import HostPlaceCards from './HostPlaceCards';
import HostPlaceForm from './HostPlaceForm'
import HostPlaceService from '../../services/host-service';
class HostPlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.service = new HostPlaceService()
    }

    componentDidMount() {
        this.getAllPlaces();
        this.getOnePlace(this.props.user._id);
        this.setState({
            user: this.props.user
        })
    }
    getAllPlaces = () => {
        this.service.getAll()
            .then((response) => {
                this.setState({
                    listOfPlaces: response.hostPlace
                })
            })
            .catch((e) => console.log(e))
    }
    getOnePlace = (hostId) =>{
        this.service.getOne(hostId)
            .then((response)=>{
                console.log(response);
                this.setState({
                    myPlace: response.hostPlace
                })
            })
    }

    render() {
        return (
            <>
            {this.props.user.musician &&  <HostPlaceCards places={this.state.listOfPlaces} user={this.props.user} />}
            {this.props.user.host &&  <HostPlaceCards place={this.state.myPlace} user={this.props.user} />}
            {this.props.user.host && <HostPlaceForm update={this.getAllPlaces} user={this.props.user} />}
            </>
        );
    }
}

export default HostPlace;