import React, { Component } from 'react';
import RequestService from '../../services/request-service';

class RequestsCards extends Component {
    constructor() {
        super()
        this.state = {
            listOfRequests =[]
        }
        this.service = new RequestService();
    }

    getAll = () => {
        
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default RequestsCards;