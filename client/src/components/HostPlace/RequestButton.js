import React, { Component } from 'react';
import RequestService from '../../services/request-service';
import { Button } from '@material-ui/core';
import FaCheck from "react-icons/lib/fa/check";
import Modal from 'react-responsive-modal';

class RequestButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            placeID: null,
            open: false
        }
        this.service = new RequestService()

    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        this.setState({
            user: this.props.user,
            placeID: this.props.placeID
        })
    }
    sendRequest = () => {
        console.log(this.state)

        this.service.new(this.props.user.musicianID, this.props.placeID)
            .then(res => {
                this.onOpenModal()
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <Button onClick={this.sendRequest} type="submit" value="Submit"> <FaCheck /></Button>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <h2>Perfect {this.state.user.username}! Request Sent Correctly</h2>
                </Modal>
            </div>
        );
    }
}

export default RequestButton;