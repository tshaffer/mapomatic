import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Converters from '../utilities/converters';

class NearbySegments extends Component {

    constructor(props) {
        super(props);

        this.strokeColors = ["red", "blue", "purple", "green", "orange", "pink", "violet", "brown", "maroon", "salmon"];
    }

    buildNearbySegmentsList(nearbySegments) {

        if (nearbySegments.length === 0) {
            return (
                <noscript/>
            );
        }

        let nearbySegmentsList = nearbySegments.map( (nearbySegment, index) => {

            console.log("distance");
            console.log(nearbySegment.distance);
            console.log(Converters.metersToMiles(nearbySegment.distance).toFixed(1), "mi");

            console.log("grade");
            console.log(nearbySegment.avg_grade.toFixed(1), "%");

            console.log("elevation gain");
            console.log(Converters.metersToFeet(nearbySegment.elev_difference).toFixed(0), "ft");

            const nearbySegmentLabelStyle = {
                color: this.strokeColors[index],
            };

            return (
                <div key={index}>
                    <div className="mapLegendActivityName">
                        <span style={nearbySegmentLabelStyle}>{nearbySegment.name}</span>
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

