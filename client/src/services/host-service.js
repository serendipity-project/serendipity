import axios from 'axios';

export default class HostPlaceService {
    constructor(props) {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/host-place`,
            withCredentials: true
        });

    }
    new = (hostID,address, date, initialTime, finishingTime, price, capacity, location, placeName) => {
        return this.service.post('/new', {
            hostID,
            address,
            date,
            initialTime,
            finishingTime,
            price,
            capacity,
            location,
            placeName,
        })
            .then(response => response.data)
    }

    edit = (hostServiceID, address, date, initialTime, finishingTime, price, capacity, location, placeName) => {
        return this.service.post(`/${hostServiceID}/edit`, {
            address,
            date,
            initialTime,
            finishingTime,
            price,
            capacity,
            location,
            placeName
        })
            .then(response => response.data)
    }
    availability = (hostServiceID, availability) => {
        return this.service.post(`/${hostServiceID}/availability`, { availability })
            .then(response => response.data)
    }
    delete = (hostServiceID) => {
        return this.service.get(`/${hostServiceID}/delete`, {})
            .then(response => response.data)
    }
    getOne = (hostServiceID) => {
        return this.service.get(`/${hostServiceID}`, {})
            .then(response => response.data)
    }
    getAll = () => {
        return this.service.get('/all', {})
            .then(response => response.data)
    }
}