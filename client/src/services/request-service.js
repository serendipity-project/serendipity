import axios from 'axios'


export default class RequestService {
    constructor(props) {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/request`,
            withCredentials: true
        });
    }
    new = (musicianID) => {
        return this.service.post(`/new/${musicianID}`, {})
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
    getAll = (hostServiceID) => {
        return this.service.get(`/${hostServiceID}`, {})
            .then(response => response.data)
    }

}

