import _t from '../../store/action_types';
import initialState from '../../store/initial_state';

export function mapUpdateState(mapCenterLat, mapCenterLng, mapZoom) {
    return {
        type: _t.MAP_UPDATE_STATE,
        payload: {
            mapCenterLat,
            mapCenterLng,
            mapZoom,
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case _t.MAP_UPDATE_STATE:
            return state
                .setIn(["ui", "mapZoom"], action.payload.mapZoom)
                .setIn(["ui", "mapCenterLat"], action.payload.mapCenterLat)
                .setIn(["ui", "mapCenterLng"], action.payload.mapCenterLng);

        default:
            return state;
    }
};

export default reducer;
