import React, { Component } from 'react';
import RequestService from '../../services/request-service';
import ConcertService from '../../services/concerts-service';

class RequestsCards extends Component {
    constructor(props){
        super(props)
        this.state= {
            user:{}
        }
        this.concertService = new ConcertService();
        this.requestService = new ConcertService();
        console.log(this.props.request,"DENTRO DE LA CARD");
    }

    componentDidMount=()=>{
        this.setState({user : this.props.user})
    }
    onClickCreateConcert = (hostId,musicianId)=>{
        this.concertService.new(hostId,musicianId)
        .then((concertCreated)=>{
            console.log(concertCreated);
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    
    render() {
        return (
            <div>
                <p>HOLA SOY UNA PUTA REQUEST JODER! PATRONA</p>
                <p>{this.props.request.artistData}</p>
                <p>{this.props.request.favouritePlayCity}</p>
                <p>{this.props.request.instruments}</p>
                <p>{this.props.request.musicStyle}</p>
                <button onClick={()=>this.onClickCreateConcert(this.state.user._id,this.props.request._id)}>Accept Request</button>
                <button>Deny Request</button>
            </div>
        );
    }
}

export default RequestsCards;