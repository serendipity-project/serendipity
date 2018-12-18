import axios from 'axios';

export default class ConcertsService {
    constructor(props) {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/concerts`,
            withCredentials: true
        });
    }
    new = (hostplaceID, musiciainID) => {
        return this.service.post(`/new/${hostplaceID}/${musiciainID}`)
            .then(response => response.data)
    }
    setCapacity = (capacity) => {
        return this.service.post("/set-capacity", { capacity })
            .then(response => response.data)
    }

    going = (concertID, capacity) => {
        return this.service.post(`/${concertID}/going`)
            .then(response => response.data)
    }

    notGoing = (concertID, capacity) => {
        return this.service.post(`/${concertID}/not-going`)
            .then(response => response.data)
    }
    getOne = (userID, concertID) => {
        return this.service.get(`/${userID}/${concertID}`, {})
            .then(response => response.data)
    }
    getAll = () => {
        return this.service.get(`/all`, {})
            .then(response => response.data)
    }
    delete = (concertID) => {
        return this.service.get(`/${concertID}/delete`, {})
            .then(response => response.data)
    }
}