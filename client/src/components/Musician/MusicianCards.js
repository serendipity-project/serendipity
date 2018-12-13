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
    getAll = () => {
        console.log("entra en getAll");

        this.service.getAll()
            .then((response) => {
                console.log(response.data)
                this.setState({
                    listOfMusicians: response.data
                })
            })
            .catch((e) => console.log(e))


    }
    componentDidMount() {
        this.getAll();
    }
    render() {
        return (
            <div>
                {/* {this.state.listOfMusicians.map((musician) => {
                    return (
                        <div>
                            <h1>Musician's name:{musician.artistData}</h1>
                        </div>
                    )
                })} */}
            </div>
        );
    }
}