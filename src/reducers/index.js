import {combineReducers} from 'redux';
import SegmentsReducer from './reducerSegments';
import DBReducer from './reducer_db';
import AthletesReducer from './reducer_athletes';
import SelectedAthleteReducer from './reducer_selected_athlete';

const rootReducer = combineReducers({
    db: DBReducer,
    athletes: AthletesReducer,
    selectedAthlete: SelectedAthleteReducer,
    segments: SegmentsReducer
});

export default rootReducer;
