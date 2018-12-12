import axios from 'axios';

import React, { Component } from 'react';

class generalServices extends Component {
    constructor(props) {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api/',
            withCredentials: true
        });
        this.service = service;
    }
    newPlace = (address, date, price, capacity, placeName) => {
        return this.service.post('/new-place', {
            address,
            date,
            price,
            capacity,
            placeName,
        })
            .then(response => response.data)
    }
}

export default generalServices;