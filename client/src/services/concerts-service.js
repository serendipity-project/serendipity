import axios from 'axios';

export default class ConcertsService {
    constructor(props) {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/concerts`,
            withCredentials: true
        });
    }


}