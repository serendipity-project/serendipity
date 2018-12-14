import React, { Component } from 'react';
import HostPlaceService from '../../services/host-service';
import { Card } from '@material-ui/core';

class HostPlaceCards extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.service = new HostPlaceService();
    }
    render() {
        const listOfPlaces = this.props.places || [];
        return (
            <div>
                {listOfPlaces.map((places) => {
                    return (
                        <Card>
                            <h3>{places.placeName}</h3>
                            <h6>{places.address}</h6>
                        </Card>
                    )
                })}
            </div>
        );
    }
}

export default HostPlaceCards;