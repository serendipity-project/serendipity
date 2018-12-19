import React, { Component } from 'react';
import RequestService from '../../services/request-service';
import { Button } from '@material-ui/core';
import FaCheck from "react-icons/lib/fa/check";

class RequestButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            placeID: null
        }
        this.service = new RequestService()

    }
    componentDidMount() {
        this.setState({
            user: this.props.user,
            placeID: this.props.placeID
        })
    }
    sendRequest = () => {
        console.log( this.state.placeID)
        this.service.new(this.props.user.musicianID, this.props.placeID)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div> 
                <Button  onClick={this.sendRequest}  type="submit" value="Submit"> <FaCheck/></Button>
            </div>
        );
    }
}

export default RequestButton;