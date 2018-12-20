import React, { Component } from 'react';
import RequestService from '../../services/request-service';
import ConcertService from '../../services/concerts-service';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import LeftArrow from 'react-icons/lib/fa/angle-left'
import RightArrow from 'react-icons/lib/fa/angle-right'
import LocationIcon from 'react-icons/lib/fa/map-marker'
import Check from 'react-icons/lib/fa/check'
import Close from 'react-icons/lib/fa/close'

class RequestsCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            requestID: {}
        }
        this.concertService = new ConcertService();
        this.requestService = new RequestService();
        // console.log(this.props.request, "DENTRO DE LA CARD");
    }

    componentDidMount = () => {
        this.setState({ user: this.props.user })

    }
    onClickCreateConcert = (hostplaceId, musicianId, requestID) => {

        this.concertService.new(hostplaceId, musicianId)
            .then((concertCreated) => {
                console.log(concertCreated);
            })
            .catch((e) => {
                console.log(e);
            })
        this.requestService.delete(requestID)
            .then(requestID => console.log(requestID))
            .catch(err => console.log(err))
    }
    handleDeleteRequests = (requestID) => {

        this.requestService.delete(requestID)
            .then(requestID => console.log(requestID))
            .catch(err => console.log(err))
    }
    render() {

        const musicianID = this.props.request.musicianID
        const { user, request } = this.props
        // console.log(this.props.request.musicianID, this.props);

        return (
            <CarouselProvider
                naturalSlideWidth={60}
                naturalSlideHeight={80}
                visibleSlides={2}
                totalSlides={10000}>
                <ButtonBack className='arrows'>
                    <LeftArrow className='arrow-icon' />
                </ButtonBack>
                <ButtonNext className='arrows'><RightArrow className='arrow-icon' /></ButtonNext>
                <Slider>
                    <Slide>
                        <div className='individual-card'>
                            <h2 className="extra-name"><span className='artist-name'>{musicianID.artistData.toUpperCase()}</span> WANTS TO PLAY AT YOUR PLACE!</h2>
                            <h4 className='city-name'>
                                <LocationIcon className='location-icon' />{musicianID.originCity.toUpperCase()} CITY</h4>
                            <div className='musicians-information'>
                                <div >
                                    <img src={musicianID.image} className='musician-photo' />
                                </div>
                                <div className='musician-data'>
                                    <span className='titles'>DESCRIPTION</span>
                                    <p>{musicianID.artistDescription.toUpperCase()}</p>
                                    <span className='titles'>MUSIC STYLE </span> <p style={{ textAlign: 'justify' }}>    {musicianID.musicStyle.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                                    <span className='titles'>INSTRUMENTS </span>  <p>    {musicianID.instruments.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                                </div>
                            </div>
                            <div className='music-info'>
                                <p>LISTEN TO MY MUSIC</p>
                                <div>
                                    <a href={musicianID.spotifyAccount}>SPOTIFY ACCOUNT</a>
                                    <a href={musicianID.youtubeAccount}>YOUTUBE ACCOUNT</a>
                                </div>
                            </div>
                            <div>
                                <button type="submit" onClick={() => this.onClickCreateConcert(user.hostPlaceID, musicianID._id, request._id)} className='button'><Check className='icon' /></button>
                                <button type="submit" onClick={() => this.handleDeleteRequests(request._id)} className='button'><Close className='icon' /></button>
                            </div>
                        </div>
                    </Slide>
                </Slider>
            </CarouselProvider>
        );
    }
}

export default RequestsCards;
