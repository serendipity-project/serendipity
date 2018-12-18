import React, { Component } from 'react';
import MusicianService from '../../services/musician-service';
import LocationIcon from 'react-icons/lib/fa/map-marker'

export default class MusicianCards extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.service = new MusicianService();
    }
    handleDelete = (res) => {
        // console.log(response)
        this.service.delete(res)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    render() {
        const listOfMusicians = this.props.musician || [];
        return (
            <>
                {/* <div style={{ display: "flex", flexDirection: "row", flexFlow: "wrap" }}> */}
                <div className='all-card'>
                    {listOfMusicians.map((musician, i) => {
                        return (
                            <>
                                <div key={i} className='individual-cards'>
                                    <img src={musician.image} className='musician-image' alt="Artist's image" />
                                    <h2 className='musician-name'>{musician.artistData.toUpperCase()}</h2>
                                    <div>
                                        <LocationIcon /><span className='city'>{musician.originCity.toUpperCase()}</span>
                                    </div>
                                    <span className='titles'>MUSIC STYLE </span> <p>{musician.musicStyle[0].toUpperCase()}</p>
                                    <span className='titles'>INSTRUMENTS </span> <p>{musician.instruments[0].toUpperCase()}</p>
                                    <span className='titles'>FAVOURITE PLACE TO PLAY </span> <p>{musician.favouritePlayCity.toUpperCase()}</p>
                                    <a href={musician.spotifyAccount} target="_blank" className='music-accounts'>SPOTIFY</a>
                                    <a href={musician.youtubeAccount} target="_blank" className='music-accounts' >YOUTUBE</a>
                                </div>
                            </>
                        )
                    })}
                </div>
            </>

        );
    }
}
{/* <Card className="musician-cards" key={i}>
                                <CardContent>
                                    <Typography component="h3" variant="h3">
                                        {musician.artistData}
                                    </Typography>
                                    <Typography component="h5" variant="h5">
                                        {musician.artistDescription}
                                    </Typography>
                                    <Typography component="h6" variant="h6">
                                        <img src={musician.image} className="musician-image" />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton
                                        className="dropdown-button"
                                        onClick={e => this.handleExpandClick(e)}
                                        aria-label="Show more"
                                    >
                                        <ExpandMoreIcon className="dropdown-button" />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography component="h5" variant="h5" align="center">About {musician.artistData}</Typography>
                                        <Typography variant="subtitle1" align="center">
                                            <span>Music styles: </span>
                                            {musician.musicStyle.map((oneGenre) => {
                                                return (<p>{oneGenre}</p>)
                                            })}
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            <span>Instruments: </span>
                                            {musician.instruments.map((oneInstrument) => {
                                                return (<p>{oneInstrument}</p>)
                                            })}
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            <span>Home city: </span>
                                            {musician.originCity}
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            <span>Favoutite Place to Play: </span>
                                            {musician.favouritePlayCity}
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            <a href={musician.musicTrack} target="_blank"> Music Track</a>
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            <a href={musician.spotifyAccount} target="_blank"> Spotify Account</a>
                                        </Typography>
                                        <Typography variant="subtitle1" align="center">
                                            <a href={musician.youtubeAccount} target="_blank"> Youtube Account</a>
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card> */}
{/* < button type="submit" onClick={() => this.handleDelete(musician._id)}>Delete</button> */ }