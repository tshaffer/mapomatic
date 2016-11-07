import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Converters from '../utilities/converters';

class NearbySegments extends Component {

    constructor(props) {
        super(props);

        // http://phrogz.net/css/distinct-colors.html
        // this.strokeColors = ["red", "blue", "purple", "green", "orange", "pink", "violet", "brown", "maroon", "salmon"];
        this.strokeColors = ["#ff0000", "#0088ff", "#cc00ff", "#ffcc00", "#400000", "#a65369", "#000059", "#ffc480", "#ff8800", "#8da629"];
    }

    buildNearbySegmentsList(nearbySegments) {

        if (nearbySegments.length === 0) {
            return (
                <noscript/>
            );
        }

        let nearbySegmentsList = nearbySegments.map( (nearbySegment, index) => {

            const distanceLbl = Converters.metersToMiles(nearbySegment.distance).toFixed(1) + "mi";
            const gradeLbl = nearbySegment.avg_grade.toFixed(1) + "%";

            console.log("elevation gain");
            console.log(Converters.metersToFeet(nearbySegment.elev_difference).toFixed(0), "ft");

            const nearbySegmentTitleStyle = {
                color: this.strokeColors[index],
                fontWeight: 'bold'
            };

            const nearbySegmentAttrsStyle = {
                color: this.strokeColors[index],
                fontWeight: 'normal',
                marginLeft: '8px'
            };

            return (
                <div key={index}>
                    <div className="mapLegendActivityName">
                        <span style={nearbySegmentTitleStyle}>{nearbySegment.name}</span>
                        <br/>
                        <span style={nearbySegmentAttrsStyle}>{distanceLbl} {gradeLbl}</span>
                    </div>
                </div>
            );
        });

        return (
            <div>
                { nearbySegmentsList }
            </div>
        );

    }

    render() {

        var self = this;

        const nearbySegmentsJSX = this.buildNearbySegmentsList(this.props.nearbySegments);

        return (
            <div id="nearbySegmentList">
                { nearbySegmentsJSX }
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        nearbySegments: state.nearbySegments
    };
}

export default connect(mapStateToProps)(NearbySegments);

NearbySegments.propTypes = {
    nearbySegments: React.PropTypes.array.isRequired
};

