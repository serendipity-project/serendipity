import React, { Component } from 'react';
import AuthService from '../../services/auth-service';
import { Grid, TextField, FormControlLabel, Switch, Button } from '@material-ui/core';

export default class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            host: "",
            musician: "",
        }
        this.service = new AuthService()
    }
    handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === "host" || name === "musician") {
            this.setState({ [name]: checked });
        } else {
            this.setState({ [name]: value });
        }
        // console.log(this.state)
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        const { username, password, email, host, musician } = this.state;
        this.service.edit(username, password, email, host, musician)
            .then(response => {
                console.log(response);
                this.setState({ username: "", password: "", email: "", host: "", musician: "", redirect: true });
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                <h1>Edit your Profile</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <Grid>
                        <Grid item>
                            <TextField placeholder='Change your Username' text='text' name='username' value={this.state.username} onChange={this.handleChange} />
                        </Grid>
                        <Grid item>
                            <TextField placeholder='Change your Email' text='email' name='email' value={this.state.email} onChange={this.handleChange} />
                        </Grid>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={this.handleChange}
                                    value={this.state.host}
                                    checked={this.state.host}
                                    color="primary"
                                    name="host"
                                />
                            }
                            label="Do you wanna Host?"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={this.handleChange}
                                    value={this.state.musician}
                                    checked={this.state.musician}
                                    color="primary"
                                    name="musician"
                                />
                            }
                            label="Are you musician?"
                        />
                    </Grid>
                    <Button variant="contained" color="primary" type="submit" value="Submit">Edit</Button>
                </form>
            </div>
        );
    }
}
