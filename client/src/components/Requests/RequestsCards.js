import React, { Component } from 'react';
import RequestService from '../../services/request-service';
import ConcertService from '../../services/concerts-service';

class RequestsCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            requestID: {}
        }
        this.concertService = new ConcertService();
        this.requestService = new RequestService();
        console.log(this.props.request, "DENTRO DE LA CARD");
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
        console.log(this.props.request.musicianID, this.props);
        
        return (
            <div>
                <p>{musicianID.artistData} wants to play at yout nice Place!</p>
                <p>{musicianID.artistData}</p>
                <p>{musicianID.favouritePlayCity}</p>
                <p>{musicianID.instruments}</p>
                <p>{musicianID.musicStyle}</p>
                <button type="submit" onClick={() => this.onClickCreateConcert(user.hostPlaceID, musicianID._id, request._id)}>Accept Request</button>
                <button type="submit" onClick={() => this.handleDeleteRequests(request._id)}>Deny Request</button>
            </div>
        );
    }
}

export default RequestsCards;
