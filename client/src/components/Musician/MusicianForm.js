import React, { Component } from 'react';
import MusicianService from '../../services/musician-service';
import { Grid, TextField, Button, } from '@material-ui/core';

export default class MusicianForm extends Component {
    constructor() {
        super()
        this.state = {
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
            file: null,
            redirect: false
        }
        this.service = new MusicianService();
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { artistData, email, originCity, musicStyle, artistDescription, instruments, favouritePlayCity, musicTrack, spotifyAccount, youtubeAccount, file } = this.state

        this.service.addPicture(this.state.file)
            .then(res => console.log(res))
            .catch(e => console.log(e))

        this.service.new(artistData, email, originCity, musicStyle, artistDescription, instruments, favouritePlayCity, musicTrack, spotifyAccount, youtubeAccount, file)
            .then(response => {
                console.log(response);
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
                    file: null,
                    redirect: true
                })
            })
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
        console.log(e.target.files);

    }
    render() {
        return (
            <div>
                <h1>Musician's Information</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <Grid>
                        <Grid item>
                            <TextField placeholder='Artist Name' text='text' name='artistData' value={this.state.artistData} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Home City' text='text' name='originCity' value={this.state.originCity} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Music Style' text='text' name='musicStyle' value={this.state.musicStyle} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Instruments' text='text' name='instruments' value={this.state.instruments} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Favourite City to Play' text='text' name='favouritePlayCity' value={this.state.favouritePlayCity} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Music Track' text='text' name='musicTrack' value={this.state.musicTrack} onChange={this.handleChange} />
                        </Grid>
                        <h3>Optional</h3>
                        <Grid item>
                            <TextField placeholder='Spotify Account' text='text' name='spotifyAccount' value={this.state.spotifyAccount} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Youtube Account' text='text' name='youtubeAccount' value={this.state.youtubeAccount} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <input type="file" name="image" value={this.state.image} onChange={this.handleChangeImage} />
                        </Grid>
                        <Button variant="contained" color="primary" type="submit" value="Submit">Save</Button>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit" value="Submit">Create</Button>
                </form>
            </div>
        );
    }
}
