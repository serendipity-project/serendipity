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
    handleInputChange = (date) => {
        this.service.filter(date)
        this.setState({
            queryDate: this.search.value,
        })
        let queryDate = this.search.value
        console.log(queryDate, 'querydata');

    }
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    filter = (e) => {
        e.preventDefault();
        this.state.listCopy = this.state.listOfPlaces
        const { listCopy, queryDate } = this.state
        // const filteredList = []

        const filteredList = listCopy.filter(place => { return place.date.includes(queryDate) })
        console.log(filteredList, 'filteredList');

        this.setState({
            listCopy: filteredList
        })

    }

    render() {
        return (
            <>
                <h1>Search by...</h1>
                <form>
                    <label>Date</label>
                    <TextField value={this.state.queryDate} name='queryDate' type='date' onChange={this.onChange} />

                    <label>City</label>
                    <TextField value={this.state.queryDate} name='queryDate' type='date' onChange={this.onChange} />

                    <button onClick={this.filter} type='submit'>Filter</button>
                </form>
                {this.props.user.musician && <HostPlaceCards places={this.state.listCopy} user={this.props.user} />}
                {this.props.user.host && <HostPlaceCards place={this.state.myPlace} user={this.props.user} />}
                {this.props.user.host && <HostPlaceForm update={this.getAllPlaces} user={this.props.user} />}
            </>
        );
    }
}

export default HostPlace;