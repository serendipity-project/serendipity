import axios from 'axios';
export default class MusicianService {
  constructor(props) {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/musician`,
      withCredentials: true
    });
  }
  new = (address, date, price, capacity, placeName) => {
    return this.service
      .post("/new", {
      artistData,
      email,
      originCity,
      musicStyle,
      artistDescription,
      instruments,
      favouritePlayCity,
      musicTrack,
      youtubeAccount,
      image,
      })
      .then(response => response.data);
  };
}