import axios from "axios";

export default class HostPlaceService {
  constructor(props) {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/host`,
      withCredentials: true
    });
  }
  newPlace = (address, date, price, capacity, placeName) => {
    return this.service
      .post("/new-place", {
        address,
        date,
        price,
        capacity,
        placeName
      })
      .then(response => response.data);
  };
}
