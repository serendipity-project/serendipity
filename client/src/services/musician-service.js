import axios from 'axios';
export default class MusicianService {
  constructor(props) {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/musician`,
      withCredentials: true
    });
  }
  new = (NEW) => {
    const formData = new FormData();
    Object.keys(NEW).forEach(key => formData.append(key, NEW[key]))
    return this.service.post("/new", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.data);
  }
  addPicture(file) {
    const formData = new FormData();
    formData.append("image", file)
    return this.service.post("/new", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.data)
  }

  edit = (musicianID, artistData, email, originCity, musicStyle, artistDescription, instruments, favouritePlayCity, musicTrack, spotifyAccount, youtubeAccount, image) => {
    return this.service.post(`/${musicianID}/edit`, {
      artistData,
      email,
      originCity,
      musicStyle,
      artistDescription,
      instruments,
      favouritePlayCity,
      musicTrack,
      spotifyAccount,
      youtubeAccount,
      image,
    })
      .then(response => response.data);
  }
  delete = (musicianID) => {
    return this.service.get(`/${musicianID}/delete`, {})
      .then(response => response.data)
  }
  getOne = (musicianID) => {
    return this.service.get(`/${musicianID}`, {})
      .then(response => response.data)
  }
  getAll = () => {
    return this.service.get('/all')
      .then(response => response.data)
  }
}