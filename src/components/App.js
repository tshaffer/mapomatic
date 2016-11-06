/**
 * Created by tedshaffer on 11/5/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DBServices from '../services/dbServices';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Map from './map';
import NearbySegments from './nearbySegments';

// import { setSelectedAthlete } from '../actions/index';
import { loadDBData } from '../actions/dbActions';

import { objectPopulated, arrayPopulated } from '../utilities/utils';

class App extends Component {

    constructor(props) {
        super(props);
        this.dbServices = null;
    }

    componentWillMount() {
        var self = this;
        const dbServices = new DBServices();
        this.dbServices = dbServices;
        const promise = dbServices.initialize();
        promise.then( dbConnection => {
            console.log("invoke loadDBData");
            self.props.loadDBData(dbServices, dbConnection);
        }, (err) => {
            console.log("db initialization failure:", err);
        });
    }

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

        let selectedAthlete = {};

        if (objectPopulated(this.props.selectedAthlete)) {
            selectedAthlete = this.props.selectedAthlete;
        }
        else if (arrayPopulated(this.props.athletes)) {
            selectedAthlete = this.props.athletes[0];
        }

        // return (
        //     <Map
        //         mapHeight={"760px"}
        //     />
        // );

        return (
            <div id="appDiv">
                <NearbySegments/>
                <Map mapHeight={"760px"}/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        db: state.db,
        athletes: state.athletes,
        selectedAthlete: state.selectedAthlete
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadDBData},
        dispatch);
}

App.propTypes = {
    db: React.PropTypes.object.isRequired,
    athletes: React.PropTypes.array.isRequired,
    // setSelectedAthlete: React.PropTypes.func.isRequired,
    selectedAthlete: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


