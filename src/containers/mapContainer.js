// import React from 'react';
import { connect } from 'react-redux';

import Map from '../components/map';

import { exploreSegments } from '../actions/index';

function mapStateToProps (state, ownProps) {
    return {
        nearbySegments: state.nearbySegments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onExploreSegments: (swLat, swLng, neLat, neLng) => {
            dispatch(exploreSegments(swLat, swLng, neLat, neLng));
        }
    };
}

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);

export default MapContainer;

// MapContainer.propTypes = {
//     mapHeight: React.PropTypes.string.isRequired,
// };
