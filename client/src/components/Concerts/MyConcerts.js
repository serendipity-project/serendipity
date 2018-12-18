import React, { Component } from 'react';
import ConcertsService from '../../services/concerts-service';

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

    render() {

        const listOfConcerts = this.state.listOfConcerts || [];
        console.log(listOfConcerts)


        return (

            <div>
                <h1>Your Concerts</h1>
                {listOfConcerts.map((concert, i) => {
                    return (
                        <>
                            <h1>{concert.musicianID.artistData}</h1>
                        </>
                    )
                })}
            </div>
        );
    }
}
