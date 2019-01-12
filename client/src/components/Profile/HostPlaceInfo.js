import React, { Component } from "react";
import './Info.css'
import HostPlaceService from "../../services/host-service";
export default class ProfileInformation extends Component {

    constructor(props) {
        super(props)
        this.hostService = new HostPlaceService()
        this.state = {
            information: null,
        }
    }
    beautifyDate = date => {
        const dateConverted = new Date(date);
        return dateConverted.toDateString();
    };
    getInfo = () => {
        this.hostService.getOne(this.props.user._id)
            .then(response => {
                this.setState({
                    information: response.hostPlace
                })
            })
            .catch(e => console.log(e))
    }

    componentDidMount() {
        this.getInfo()
    }

    render() {
        const places = this.state.information
        const user = this.props.user
        return places ? (
            <>
                {/* <div style={{display:'flex',justifyContent:'center'}}> */}
                    <h2 className='musician-name'>{user.username.toUpperCase()}'S INFORMATION</h2>
                    <div className="hostplace-card">
                        <div>
                            <span className='titles'>USERNAME</span> 
                            <p className='info-1'>{user.username.toUpperCase()}</p>
                            <span className='titles'>EMAIL</span> 
                            <p className='info-1'>{user.email.toUpperCase()}</p>
                            <span className='titles'>PLACENAME</span>
                            <p className='info-1'>{places.placeName.toUpperCase()}</p>
                        </div>
                        <div>
                            <span className='titles'>ADDRESS</span>
                            <p className='info-1'>{places.address.toUpperCase()}</p>
                            <span className='titles'>CAPACITY</span>
                            <p className='info-1'>{places.capacity}</p>
                            <span className='titles'>PRICE</span>
                            <p className='info-1'>{places.price}$</p></div>
                        <div>
                            <span className='titles'>INITITAL TIME</span>
                            <p className='info-1'>{places.initialTime}</p>
                            <span className='titles'>FINISHING TIME</span>
                            <p className='info-1'>{places.finishingTime}</p>
                            <span className='titles'>DATE</span>
                            <p className='info-1'>{this.beautifyDate(places.date)}</p></div>
                    </div>
                {/* </div> */}
            </>
        ) : (
                <p>Loading</p >
            )
    }
}
