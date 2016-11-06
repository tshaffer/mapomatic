/**
 * Created by tedshaffer on 11/5/16.
 */
import { SET_NEARBY_SEGMENTS } from '../actions/index';

const initialState = [];

export default function(state = initialState, action) {

    let newState = null;

    switch (action.type) {

        case SET_NEARBY_SEGMENTS: {
            newState = Object.assign( [], action.nearbySegments);
            return newState;
        }
    }

    return state;
}
