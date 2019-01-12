import React, { Component } from "react";

import MusicianService from "../../services/musician-service";
import './Info.css'
export default class ProfileInformation extends Component {

    constructor(props) {
        super(props)
        this.musicianService = new MusicianService()
        this.state = {
            information: null,
        }
    }

    getInfo = () => {
        this.musicianService.getOne(this.props.user.musicianID)
            .then(response => {
                this.setState({
                    information: response.musician
                })
            })
            .catch(e => console.log(e))
    }

    componentDidMount() {
        this.getInfo()
    }

    render() {
        // console.log(this.props.user)
        const musician = this.state.information
        const user = this.props.user
        return musician ? (
            <div className='musician-card'>
                <img src={musician.image} className='musician-image' alt=''/>
                <div className='info-container'>
                    <h2 className='musician-name'>{musician.artistData.toUpperCase()}'S INFORMATION</h2>
                    {/* <div>
                        <span className='city'>} CITY</span>
                    </div> */}
                    <span className='titles'>USERNAME</span> <p>{user.username.toUpperCase()}</p>
                    <span className='titles'>EMAIL</span> <p>{user.email.toUpperCase()}</p>
                    <span className='titles'>ORIGIN CITY</span><p>{musician.originCity.toUpperCase()}</p>
                    <span className='titles'>DESCRIPTION</span><p>{musician.artistDescription.toUpperCase()}</p>
                    <span className='titles'>MUSIC STYLE </span> <p>    {musician.musicStyle.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                    <span className='titles'>INSTRUMENTS </span>  <p>    {musician.instruments.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                    <span className='titles'>FAVOURITE PLACE TO PLAY </span> <p>{musician.favouritePlayCity.toUpperCase()}</p>
                    <a href={musician.spotifyAccount} target="_blank" className='music-accounts'>SPOTIFY</a>
                    <a href={musician.youtubeAccount} target="_blank" className='music-accounts' >YOUTUBE</a>
                    <a href={musician.musicTrack} target='_blank' className='music-accounts'>MUSIC TRACK </a>
                </div>
            </div>
        ) : (
                <p>Loading</p>
            )

    }
}