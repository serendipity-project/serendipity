import React, { Component } from 'react';
import HostPlaceCards from './HostPlaceCards';
import HostPlaceForm from './HostPlaceForm'
import HostPlaceService from '../../services/host-service';
import { TextField } from '@material-ui/core';
import './HostPlace.css';
class HostPlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            listOfPlaces: null,
            listCopyPlaces: null,
            queryDate: '',
            queryCity: ""
        }
        this.service = new HostPlaceService()
    }

    componentDidMount() {
        this.getAllPlaces();
        this.getOnePlace(this.props.user._id);
       /*  this.setState({
            user: this.props.user
        }) */
    }
    getAllPlaces = () => {
        this.service.getAll()
            .then((response) => {
                this.setState({
                    listOfPlaces: response.hostPlace,
                    listCopyPlaces: response.hostPlace
                })
            })
            .catch((e) => console.log(e))
    }
    getOnePlace = (hostId) => {
        console.log(hostId)
        this.service.getOne(hostId)
            .then((response) => {
                console.log(response, 'response')
                this.setState({
                    myPlace: response.hostPlace,
                    user: this.props.user
                })
            })
    }
    filter = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        this.setState({ [name]: value }, () => {
            const filtered = [...this.state.listOfPlaces]
            const filteredList = filtered.filter(place => {
                if (this.state.queryCity === '') {
                    console.log('solo fecha')
                    return place.date.includes(this.state.queryDate)
                }
                else if (this.state.queryDate === '') {
                    console.log('solo ciudad')
                    return place.address.toLowerCase().includes(this.state.queryCity.toLowerCase())
                } else {
                    return place.date.includes(this.state.queryDate) && place.address.toLowerCase().includes(this.state.queryCity.toLowerCase())
                }
            })
            this.setState({
                listCopyPlaces: filteredList
            })
        })
    }
    render() {
        
        return (

            <>
                {this.props.user.musician &&
                    <>
                        <h1 className="title-host">HOSTS</h1>
                        <form>
                            <TextField name='queryDate' value={this.state.queryDate} type='date' onChange={this.filter} label='Date' InputLabelProps={{
                                shrink: true,
                            }} />

                            <TextField value={this.state.queryCity} name='queryCity' type='text' onChange={this.filter} label='City' InputLabelProps={{
                                shrink: true,
                            }} />
                        </form>
                    </>}

                {this.props.user.musician && <HostPlaceCards places={this.state.listCopyPlaces} user={this.props.user} />}
                {this.props.user.host && <HostPlaceCards place={this.state.myPlace} user={this.props.user} />}
                {this.props.user.host && <HostPlaceForm update={(e)=>this.getOnePlace(e)} user={this.props.user} />}
            </>
        );
    }
}

export default HostPlace;