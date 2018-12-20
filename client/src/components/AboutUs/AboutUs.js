import React, { Component } from 'react';
import './AboutUs.css'
import ba from './aboutus1.jpg'
export default class AboutUs extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className='about-us'>
                <h1>Serendipity</h1>
                <h2>Finding something beautiful without looking for it</h2>
                <h2>Music is wherever you are</h2>
                {/* <img src={ba} /> */}
            </div>
        );
    }
}

