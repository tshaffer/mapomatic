/**
 * Created by tedshaffer on 11/5/16.
 */
import { fetchNearbySegments } from './stravaActions';

export const SET_SELECTED_ATHLETE = 'SET_SELECTED_ATHLETE';
export const CLEAR_SEGMENTS = 'CLEAR_SEGMENTS';
export const SET_NEARBY_SEGMENTS = 'SET_NEARBY_SEGMENTS';

export function setSelectedAthlete(athlete) {
    return {
        type: SET_SELECTED_ATHLETE,
        athlete
    };
}

export function exploreSegments(swLat, swLng, neLat, neLng) {

    return function (dispatch, getState) {
        let promise = fetchNearbySegments(swLat, swLng, neLat, neLng, getState);
        promise.then( (nearbySegments) => {

            // nearbySegments.segments - array
            // each member
            //      avg_grade - number - percent
            //      distance - number (meters?)
            //      elev_difference - number (meters?)
            //      end_latlng[2]
            //      id - number (segmentId)
            //      name - string
            //      points - string - polyline?
            //      starred - bool
            //      start_latlng
            //

            // dispatch nearbySegments to store in redux store
            dispatch(setNearbySegments(nearbySegments.segments));
        });
    };
}

function setNearbySegments(nearbySegments) {
    return {
        type: SET_NEARBY_SEGMENTS,
        nearbySegments
    };
}