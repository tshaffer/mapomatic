import {combineReducers} from 'redux';
import SegmentsReducer from './reducerSegments';

const rootReducer = combineReducers({
    segments: SegmentsReducer
});

export default rootReducer;
