import axios from 'axios';

export default class HostPlaceService {
    constructor(props) {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/host-place`,
            withCredentials: true
        });

    }
    new = (hostID, address, date, initialTime, finishingTime, price, capacity, location, placeName, hostPlaceID) => {
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
            hostPlaceID
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
<<<<<<< HEAD
    getOne = (hostPlaceID) => {
=======
    getOne = ( hostPlaceID) => {
>>>>>>> 7de1f8fd1765fb000c8c9463cbda7203fc400f52
        return this.service.get(`/${hostPlaceID}`, {})
            .then(response => response.data)
    }
    // getOne = (userID, hostPlaceID) => {
    //     return this.service.get(`/${userID}/${hostPlaceID}`, {})
    //         .then(response => response.data)
    // }
    getAll = () => {
        return this.service.get('/all', {})
            .then(response => response.data)
    }
}