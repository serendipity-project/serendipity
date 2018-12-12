import axios from 'axios';

export default class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: `http://localhost:5000/api/auth`,
            // baseURL: `${process.env.REACT_API_URL}||  http://localhost:5000/api/auth`,
            withCredentials: true
        });
        this.service = service;
    }

    signup = (username, password, email, host, musician) => {
        return this.service.post('/signup', {
                username,
                password,
                email,
                host,
                musician
            })
            .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('/login', {
                username,
                password
            })
            .then(response => response.data)
    }

    logout = () => {
        return this.service.get('/logout', {})
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    }

    edit = (username, email, host,musician) => {
        return this.service.post('/edit', {
                username,
                email,
                host,
                musician
            })
            .then(response => response.data)
    }
}