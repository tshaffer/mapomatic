import {combineReducers} from 'redux';
import SegmentsReducer from './reducerSegments';
import DBReducer from './reducerDB';
import AthletesReducer from './reducerAthletes';
import SelectedAthleteReducer from './reducerSelecterAthlete';

const rootReducer = combineReducers({
    db: DBReducer,
    athletes: AthletesReducer,
    selectedAthlete: SelectedAthleteReducer,
    segments: SegmentsReducer
});

export default rootReducer;
