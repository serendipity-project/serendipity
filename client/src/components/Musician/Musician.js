import React, { Component } from 'react';
import MusicianForm from './MusicianForm';
import MusicianCards from './MusicianCards';
import "./Musician.css"

export default class Musician extends Component {
    render() {
        return (
            <div>
                <MusicianCards />
                <MusicianForm />
            </div>
        );
    }
}
