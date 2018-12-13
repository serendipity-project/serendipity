import React, { Component } from 'react';
import MusicianService from '../../services/musician-service';


export default class MusicianCards extends Component {
    constructor() {
        super()
        this.state = {
            listOfMusicians: null
        }
        this.service = new MusicianService();
    }
    render() {
        return (
            <div>
                <h1>Artist's name:{}</h1>
            </div>
        );
    }
}