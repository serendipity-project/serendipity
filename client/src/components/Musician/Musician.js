import React, { Component } from 'react';
import MusicianForm from './MusicianForm';
import MusicianCards from './MusicianCards';
import "./Musician.css"
import MusicianService from '../../services/musician-service';
import { TextField } from '@material-ui/core';


export default class Musician extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            user: null,
            listOfMusicians: null,
            listCopyMusician: null,
            queryGenre: '',
            queryInstruments: ''
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
                    listOfMusicians: response.musician,
                    listCopyMusician: response.musician
                })
            })
            .catch((e) => console.log(e))
    }

    filter = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
        const filtered = [...this.state.listOfMusicians]
        // // const filteredList = []
        const filteredList = filtered.filter(musician => { return musician.musicStyle.includes(e.target.value) || musician.instruments.includes(e.target.value) })
        this.setState({
            listCopyMusician: filteredList
        })
    }

    render() {
        return (
            <div>
                <h1>Search by...</h1>
                <form>
                    <TextField name='queryGenre' value={this.state.queryGenre} type='text' onChange={this.filter} label='Genre' InputLabelProps={{
                        shrink: true,
                    }} />

                    <TextField value={this.state.queryInstruments} name='queryInstruments' type='text' onChange={this.filter} label='Instruments' InputLabelProps={{
                        shrink: true,
                    }} />
                </form>
                <MusicianCards musician={this.state.listCopyMusician} />
                {this.props.user.musician && <MusicianForm update={this.update} />}
            </div>
        );
    }
}
