/**
 * Created by tedshaffer on 11/5/16.
 */
import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {

    componentDidMount() {

        console.log("app.js::componentDidMount invoked");
    }

    render() {

        return (
            <MuiThemeProvider>
                <div>
                    MapOMatic
                </div>
            </MuiThemeProvider>
        );
    }
}


