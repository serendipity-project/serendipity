import React, { Component } from 'react';
import ConcertsService from '../../services/concerts-service';
import { Card } from "@material-ui/core";

export default class MyConcerts extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            user: null,
            listOfConcerts: null
        }
        this.service = new ConcertsService()
    }
    componentDidMount = () => {
        this.setState({
            user: this.props.user
        })
        this.getOne(this.props.user._id, this.props.user.concerts)
    }
    getOne = (userID, concertID) => {
        const concertsArr = []
        for (var i = 0; i < concertID.length; i++) {
            this.service.getOne(userID, concertID[i])
                .then((concert) => {
                    console.log(concert)
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
        console.log(listOfConcerts)


        return (

            <div>
                <h1>Your Concerts</h1>
                {listOfConcerts.map((concert, i) => {
                    return (
                        <>
                            <Card key={i} className="card-host-place">
                                <h3>{concert.hostID.placeName}</h3>
                                <h4>{concert.hostID.address}</h4>
                                <h4>{concert.hostID.initialTime}h</h4>
                                <h4>{concert.hostID.finishingTime}h</h4>
                                <h4>Date: {this.beautifyDate(concert.hostID.date)}</h4>
                                <div className="numbers-container">
                                    <span>CAPACITY</span><span className="number">{concert.hostID.capacity} </span>
                                    <span>PRICE</span><span className="number">{concert.hostID.price} </span>
                                </div>
                                <h3>{concert.musicianID.artistData}</h3>
                                <a href={concert.musicianID.musicTrack}>Music Track</a>
                                {/* <h4>{concert.musicianID}</h4> */}
                            </Card>
                        </>
                    )
                })}
            </div>
        );
    }
}
