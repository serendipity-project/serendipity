import React, { Component } from 'react';
import HostPlaceService from '../../services/host-service';
import { Card } from '@material-ui/core';
import RequestButton from './RequestButton';

class HostPlaceCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.service = new HostPlaceService();
    }
    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }
    render() {
        const listOfPlaces = this.props.places || [];
        return (
            <div>
                {listOfPlaces.map((places, i) => {
                    return (
                        <Card key={i}>
                            <h3>{places.placeName}</h3>
                            <h6>{places.address}</h6>
                            <h6>{places.initialTime}</h6>
                            <h6>{places.finishingTime}</h6>
                            {this.props.user.musician && <RequestButton user={this.props.user} placeID={places._id} />}

                        </Card>
                    )
                })}
            </div>
        );
    }
}

export default HostPlaceCards;