/**
 * Created by tedshaffer on 11/5/16.
 */
import { CLEAR_SEGMENTS } from '../actions/index';

const initialState = [];

export default function(state = initialState, action) {

    let newState = state;

    switch (action.type) {

        case CLEAR_SEGMENTS: {
            return initialState;
        }
    }

    return state;
}