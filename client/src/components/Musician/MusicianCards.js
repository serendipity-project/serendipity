import React, { Component } from 'react';
import MusicianService from '../../services/musician-service';
import { Card, CardContent, Typography, CardActions, IconButton, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default class MusicianCards extends Component {
    constructor() {
        super()
        this.state = {
            listOfMusicians: [],
            expanded: false
        }
        this.service = new MusicianService();
    }
    componentDidMount() {
        this.service.getAll()
            .then((response) => {
                // console.log(response.musician)
                this.setState({
                    listOfMusicians: response.musician
                })
            })
            .catch((e) => console.log(e))

    }
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        return (
            <>
                {/* <div style={{ display: "flex", flexDirection: "row", flexFlow: "wrap" }}> */}
                {this.state.listOfMusicians.map((musician) => {
                    return (
                        <Card className="musician-cards">
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
                                    onClick={this.handleExpandClick}
                                    // aria-expanded={this.state.expanded}
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
                                        {musician.musicStyle}
                                    </Typography>
                                    <Typography variant="subtitle1" align="center">
                                        <span>Instruments: </span>
                                        {musician.instruments}
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
                                        <a href={musician.musicTrack} > Music Track</a>
                                    </Typography>
                                    <Typography variant="subtitle1" align="center">
                                        <a href={musician.spotifyAccount} > Spotify Account</a>
                                    </Typography>
                                    <Typography variant="subtitle1" align="center">
                                        <a href={musician.youtubeAccount} > Youtube Account</a>
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>

                    )
                })}
                {/* </div> */}
            </>

        );
    }
}