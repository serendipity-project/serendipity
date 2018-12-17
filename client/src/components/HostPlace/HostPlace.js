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
        this.update();
        this.setState({
            user: this.props.user
        })
    }
    update = () => {
        this.service.getAll()
            .then((response) => {
                this.setState({
                    listOfPlaces: response.hostPlace
                })
            })
            .catch((e) => console.log(e))
    }

    render() {
        return (
            <div>
                <HostPlaceCards places={this.state.listOfPlaces} user={this.props.user} />
                {this.props.user.host && <HostPlaceForm update={this.update} user={this.props.user} />}
            </div>
        );
    }
}

export default HostPlace;