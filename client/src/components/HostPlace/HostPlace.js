import React, { Component } from 'react';
import HostPlaceCards from './HostPlaceCards';
import HostPlaceForm from './HostPlaceForm'
import HostPlaceService from '../../services/host-service';
import { TextField } from '@material-ui/core';
class HostPlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            listOfPlaces: null,
            listCopy: null,
            queryDate: '',
            queryCity: ""
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
                    listOfPlaces: response.hostPlace,
                    listCopy: response.hostPlace
                })
            })
            .catch((e) => console.log(e))
    }
    getOnePlace = (hostId) => {
        this.service.getOne(hostId)
            .then((response) => {
                console.log(response);
                this.setState({
                    myPlace: response.hostPlace
                })
            })
    }

    // onChange = (e) => {
    //     const { name, value } = e.target;
    //     this.setState({ [name]: value });
    // }
    filterDate = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
        const filtered = [...this.state.listOfPlaces]
        // // const filteredList = []
        const filteredList = filtered.filter(place => { return place.date.includes(e.target.value) || place.address.includes(e.target.value) })
        this.setState({
            listCopy: filteredList
        })
    }
    filterCity = (e) => {
        e.preventDefault()
        this.state.listCopy = this.state.listOfPlaces
        const { listCopy, queryCity } = this.state
        // const filteredList = []

        const filteredList = listCopy.filter(place => { return place.address.includes(queryCity) })
        // console.log(filteredList, 'filteredList');

        this.setState({
            listCopy: filteredList
        })
    }
    render() {
        return (
            <>
                {this.props.user.musician &&
                    <>
                        <h1>Search by...</h1>
                        <form>
                            <TextField name='queryDate' value={this.state.queryDate} type='date' onChange={this.filterDate} label='Date' InputLabelProps={{
                                shrink: true,
                            }} />

                            <TextField value={this.state.queryCity} name='queryCity' type='text' onChange={this.filterDate} placeholder='City' />
                            {/* <button onClick={this.filterDate} type='submit'>Filter</button> */}
                        </form>
                    </>}
                {this.props.user.musician && <HostPlaceCards places={this.state.listCopy} user={this.props.user} />}
                {this.props.user.host && <HostPlaceCards place={this.state.myPlace} user={this.props.user} />}
                {this.props.user.host && <HostPlaceForm update={this.getAllPlaces} user={this.props.user} />}
            </>
        );
    }
}

export default HostPlace;