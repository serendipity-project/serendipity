import React, { Component } from 'react';
import MusicianService from '../../services/musician-service';


export default class MusicianCards extends Component {
    constructor() {
        super()
        this.state = {
            listOfMusicians: []
        }
        this.service = new MusicianService();
    }
    componentDidMount() {
        this.service.getAll()
            .then((response) => {
                console.log(response.musician)
                this.setState({
                    listOfMusicians: response.musician
                })
                // console.log(this.state, 'dentro de getall')
            })
            .catch((e) => console.log(e))

    }
    render() {
        console.log(this.state, 'dentro del render')
        return (
            <div>
                {this.state.listOfMusicians.map((musician) => {
                    return (
                        <div>
                            <h3><span>Musician's name:</span> {musician.artistData}</h3>
                        </div>
                    )
                })}
            </div>
        );
    }
}