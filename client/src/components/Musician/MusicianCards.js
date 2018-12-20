import React, { Component } from 'react';
import MusicianService from '../../services/musician-service';
import LocationIcon from 'react-icons/lib/fa/map-marker'
import LeftArrow from 'react-icons/lib/fa/angle-left'
import RightArrow from 'react-icons/lib/fa/angle-right'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
export default class MusicianCards extends Component {
    constructor() {
        super()
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
            <CarouselProvider
                naturalSlideWidth={60}
                naturalSlideHeight={80}
                visibleSlides={3}
                totalSlides={listOfMusicians.length}>
                <ButtonBack className='arrows'>
                    <LeftArrow className='arrow-icon' />
                </ButtonBack>
                <ButtonNext className='arrows'><RightArrow className='arrow-icon' /></ButtonNext>
                <Slider>
                    <div className='all-card'>
                        {listOfMusicians.map((musician, i) => {
                            return (
                                <Slide>
                                    <div key={i} className='individual-cards'>
                                        <img src={musician.image} className='musician-image' />
                                        <div className='info-container'>
                                            <h2 className='musician-name'>{musician.artistData.toUpperCase()}</h2>
                                            <div>
                                                <LocationIcon /><span className='city'>{musician.originCity.toUpperCase()} CITY</span>
                                            </div>
                                            <span className='titles'>MUSIC STYLE </span> <p>    {musician.musicStyle.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                                            <span className='titles'>INSTRUMENTS </span>  <p>    {musician.instruments.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                                            <span className='titles'>FAVOURITE PLACE TO PLAY </span> <p>{musician.favouritePlayCity.toUpperCase()}</p>
                                            <a href={musician.spotifyAccount} target="_blank" className='music-accounts'>SPOTIFY</a>
                                            <a href={musician.youtubeAccount} target="_blank" className='music-accounts' >YOUTUBE</a>
                                        </div>
                                    </div>
                                </Slide>
                            )
                        })}
                    </div>
                </Slider>
            </CarouselProvider >

        );
    }
}
{/* < button type="submit" onClick={() => this.handleDelete(musician._id)}>Delete</button> */ }