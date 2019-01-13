import React, { Component } from 'react';
import ConcertsService from '../../services/concerts-service';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import LeftArrow from 'react-icons/lib/fa/angle-left'
import RightArrow from 'react-icons/lib/fa/angle-right'
import LocationIcon from 'react-icons/lib/fa/map-marker'
import FaClockO from "react-icons/lib/fa/clock-o";
import './MyConcerts.css'

export default class MyConcerts extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            user: null,
            listOfConcerts: null
        }
        this.service = new ConcertsService()
    }
    componentWillMount = () => {
        this.setState({
            user: this.props.user
        }, () => {
            this.getOne(this.props.user._id, this.props.user.concerts)
        })
    }
    getOne = (userID, concertID) => {
        const concertsArr = []
        for (var i = 0; i < concertID.length; i++) {
            this.service.getOne(userID, concertID[i])
                .then((concert) => {
                    // console.log(concert)
                    concertsArr.push(concert)

                    this.setState({
                        listOfConcerts: concertsArr
                    })
                })
        }
    }

    beautifyDate = (date) => {
        const dateConverted = new Date(date);
        return dateConverted.toDateString();
    }
    render() {

        const listOfConcerts = this.state.listOfConcerts || [];
        // console.log(listOfConcerts)
        console.log(listOfConcerts.length, 'length')
        if (listOfConcerts.length >= 1) {
            return (
                <div>
                    <h1>Your Concerts</h1>
                    <CarouselProvider
                        naturalSlideWidth={90}
                        naturalSlideHeight={160}
                        visibleSlides={3}
                        totalSlides={listOfConcerts.length}
                    >
                        <ButtonBack className='arrows'>
                            <LeftArrow className='arrow-icon' />
                        </ButtonBack>
                        <ButtonNext className='arrows'><RightArrow className='arrow-icon' /></ButtonNext>
                        <Slider>
                            {listOfConcerts.map((concert, i) => {
                                return (
                                    <>
                                        <Slide >
                                            <div key={i} className='concert-card'>
                                                <img src={concert.musicianID.image} className='musician-photo' alt='' />
                                                <div className='padding-for-body'>
                                                    <h2 className='artist-name'>{concert.musicianID.artistData.toUpperCase()}</h2>
                                                    <h3>{concert.hostID.placeName}</h3>
                                                    <div style={{ display: "flex", height: "2rem" }}>
                                                        <LocationIcon className='icons' /><p className='grey-titles'>{concert.hostID.address}</p>
                                                    </div>
                                                    <div className='middle-info'>
                                                        <div className='time-and-date-info'>
                                                            <h6 className='time-and-date'>{this.beautifyDate(concert.hostID.date)}</h6>
                                                            <h6 className='time-and-date'> <FaClockO className='icons' /> {concert.hostID.initialTime} -{concert.hostID.finishingTime}</h6>
                                                        </div>
                                                        <div className='musician-info-concert'>
                                                            <span className='titles'>MUSIC STYLE </span> <p>    {concert.musicianID.musicStyle.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                                                            <span className='titles'>INSTRUMENTS </span>  <p>    {concert.musicianID.instruments.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <hr />
                                                    </div>
                                                    <div className="numbers-container">
                                                        <div>
                                                            <span className="number">{concert.hostID.price}$ </span><span className='grey-titles'>PRICE</span>
                                                        </div>
                                                        <div>
                                                            <span className="number">{concert.hostID.capacity} </span><span className='grey-titles'>CAPACITY</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Slide>
                                    </>
                                )
                            })}
                        </Slider>
                    </CarouselProvider>
                    {/* <footer className='footer' /> */}
                </div>
            )
        } else {
            return <h3 style={{ margin: "4%" }}>You don't have any concerts for the moment! </h3>
        }
    }
}
