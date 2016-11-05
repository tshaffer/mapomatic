/**
 * Created by tedshaffer on 11/5/16.
 */
export const SET_SELECTED_ATHLETE = 'SET_SELECTED_ATHLETE';
export const CLEAR_SEGMENTS = 'CLEAR_SEGMENTS';

export function setSelectedAthlete(athlete) {
    return {
        type: SET_SELECTED_ATHLETE,
        athlete
    };
}
