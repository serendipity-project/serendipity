import React, { Component } from 'react';
import RequestService from '../../services/request-service';
import ConcertService from '../../services/concerts-service';
import LocationIcon from 'react-icons/lib/fa/map-marker'
import Check from 'react-icons/lib/fa/check'
import Close from 'react-icons/lib/fa/close'

import Modal from 'react-responsive-modal';

class RequestsCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            requestID: {},
            open: false
        }
        this.concertService = new ConcertService();
        this.requestService = new RequestService();
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount = () => {
        this.setState({ user: this.props.user })

    }
    onClickCreateConcert = (hostplaceId, musicianId, requestID) => {

        this.concertService.new(hostplaceId, musicianId)
            .then(() => {
                this.onOpenModal()
            })
            .catch((e) => {
                console.log(e);
            })
        this.requestService.delete(requestID)
            .then(() => {
                this.props.update(this.props.user._id)
            })
            .catch(err => console.log(err))
    }
    handleDeleteRequests = (requestID) => {

        this.requestService.delete(requestID)
            .then(() => {
                this.props.update(this.props.user._id)
            })
            .catch(err => console.log(err))
    }
    render() {

        const musicianID = this.props.request.musicianID
        const { user, request } = this.props

        return (
            <>
                <div className='individual-card'>
                    <h3 className="extra-name"><span className='artist-name'>{musicianID.artistData.toUpperCase()}</span> WANTS TO PLAY AT YOUR PLACE!</h3>
                    <h4 className='city-name'>
                        <LocationIcon className='location-icon' />{musicianID.originCity.toUpperCase()} CITY</h4>
                    <div className='musicians-information'>
                        <div >
                            <img src={musicianID.image} className='musicians-photo' alt='' />
                        </div>
                        <div className='musician-data'>
                            <span className='titles font'>DESCRIPTION</span>
                            <p className='font'> {musicianID.artistDescription.toUpperCase()}</p>
                            <span className='titles font'>MUSIC STYLE </span> <p className='font' style={{ textAlign: 'justify' }}>    {musicianID.musicStyle.toString().replace(/,/g, ' / ').toUpperCase()}</p>
                            <span className='titles font'>INSTRUMENTS </span>  <p className='font'>     {musicianID.instruments.toString().replace(/,/g, ' / ').toUpperCase()}</p>
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
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Perfect {this.state.user.username}! A concert was created with {musicianID.artistData}</h2>
                </Modal>
            </>
        );
    }
}

export default RequestsCards;
