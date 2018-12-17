import axios from 'axios'

export default class RequestService {
    constructor(props) {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/requests`,
            withCredentials: true
        });
    }
    new = (musicianID, hostPlaceID) => {
        return this.service.post(`/new/${musicianID}`, { hostPlaceID })
            .then(response => response.data)
    }
    delete = (requestID) => {
        return this.service.get(`/${requestID}/delete`, {})
            .then(response => response.data)
    }

    getOne = (requestID) => {
        return this.service.get(`/${requestID}`, {})
            .then(response => response.data)
    }
    getAll = (hostID) => {
        return this.service.get(`/all/${hostID}`, {})
            .then(response => response.data)
    }

}

