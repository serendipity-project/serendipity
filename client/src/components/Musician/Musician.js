import React, { Component } from 'react';
import MusicianForm from './MusicianForm';
import MusicianCards from './MusicianCards';
import "./Musician.css"
import HostPlaceCards from '../HostPlace/HostPlaceCards';
import MusicianService from '../../services/musician-service';


export default class Musician extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            user: null
        }
        this.service = new MusicianService
    }

    componentDidMount() {
        this.update();
        this.setState({
            user: this.props.user
        })
    }
    update = () => {
        this.service.getAll()
            .then((response) => {
                // console.log(response.musician)
                this.setState({
                    listOfMusicians: response.musician
                })
            })
            .catch((e) => console.log(e))
    }
    render() {
        return (
            <div>
                {/* <HostPlaceCards></HostPlaceCards> */}
                <MusicianCards musician={this.state.listOfMusicians} />
                {this.props.user.musician && <MusicianForm update={this.update} />}
            </div>
        );
    }
}
