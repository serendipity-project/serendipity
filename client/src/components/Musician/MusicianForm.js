import React, { Component } from 'react';
import MusicianService from '../../services/musician-service';
import { TextField, Button, } from '@material-ui/core';

export default class MusicianForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            artistData: "",
            email: "",
            originCity: "",
            musicStyle: "",
            artistDescription: "",
            instruments: "",
            favouritePlayCity: "",
            musicTrack: "",
            spotifyAccount: "",
            youtubeAccount: "",
            image: "",
            file: null,
            redirect: false
        }
        this.service = new MusicianService();
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { artistData, email, originCity, musicStyle, artistDescription, instruments, favouritePlayCity, musicTrack, spotifyAccount, youtubeAccount, image, file } = this.state
        console.log(file)
        this.service.new({ artistData, email, originCity, musicStyle, artistDescription, instruments, favouritePlayCity, musicTrack, spotifyAccount, youtubeAccount, image, file })
            .then(response => {
                this.setState({
                    artistData: "",
                    email: "",
                    originCity: "",
                    musicStyle: "",
                    artistDescription: "",
                    instruments: "",
                    favouritePlayCity: "",
                    musicTrack: "",
                    spotifyAccount: "",
                    youtubeAccount: "",
                    image: "",
                    file: null,
                    redirect: true
                }, () => {
                    this.props.update()
                })
            })
            .catch(e => console.log(e))

    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }
    handleChangeImage = (e) => {
        this.setState({
            file: e.target.files[0]
        })
        console.log(e.target.files[0]);
    }
    render() {
        return (
            <div>
                <h2>Profile to perform at Serendipity</h2>
                <form onSubmit={this.handleFormSubmit}>
                <h3>Artist Information</h3>
                            <TextField placeholder='Artist Name' text='text' name='artistData' value={this.state.artistData} onChange={this.handleChange} />
                            <TextField placeholder='Home City' text='text' name='originCity' value={this.state.originCity} onChange={this.handleChange} />
                            <TextField placeholder='Music Style' text='text' name='musicStyle' value={this.state.musicStyle} onChange={this.handleChange} />
                            <TextField placeholder='Tell us About You' text='text' name='artistDescription' value={this.state.artistDescription} onChange={this.handleChange} multiline
                                rowsMax="6" />
                            <TextField placeholder='Instruments' text='text' name='instruments' value={this.state.instruments} onChange={this.handleChange} />
                            <TextField placeholder='Favourite City to Play' text='text' name='favouritePlayCity' value={this.state.favouritePlayCity} onChange={this.handleChange} />
                            <TextField placeholder='Music Track' text='text' name='musicTrack' value={this.state.musicTrack} onChange={this.handleChange} />
                        <h3>Music Portfolio</h3>
                            <TextField placeholder='Spotify Account' text='text' name='spotifyAccount' value={this.state.spotifyAccount} onChange={this.handleChange} />
                            <TextField placeholder='Youtube Account' text='text' name='youtubeAccount' value={this.state.youtubeAccount} onChange={this.handleChange} />
                            <input type="file" name="image" onChange={this.handleChangeImage} />
                        <Button variant="contained" color="primary" type="submit" value="Submit">Save</Button>
                </form>
            </div>
        );
    }
}
