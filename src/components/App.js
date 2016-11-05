/**
 * Created by tedshaffer on 11/5/16.
 */
import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Map from './map';

export default class App extends Component {

    componentDidMount() {

        console.log("app.js::componentDidMount invoked");
    }

//     return (
// <MuiThemeProvider>
// <div>
// MapOMatic
// </div>
// </MuiThemeProvider>
// );
    render() {

        return (
            <Map
                mapHeight={"760px"}
            />
        );
    }
}


