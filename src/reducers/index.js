import {combineReducers} from 'redux';
import SegmentsReducer from './reducerSegments';
import DBReducer from './reducerDB';
import AthletesReducer from './reducerAthletes';
import SelectedAthleteReducer from './reducerSelecterAthlete';
import NearbySegmentsReducer from './reducerNearbySegments';

const rootReducer = combineReducers({
    db: DBReducer,
    athletes: AthletesReducer,
    selectedAthlete: SelectedAthleteReducer,
    segments: SegmentsReducer,
    nearbySegments: NearbySegmentsReducer
});

export default rootReducer;
