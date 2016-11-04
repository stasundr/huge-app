import {Map, List} from 'immutable';
const initialState = Map({
    "currentTab": 0,
    "lastTab": 0,

    "isPending": false,
    "isGroupedByPopulation": false,
    "viewMode": 0, // 0 - all, 1 - global search & selected, 2 - selected only
    "searchString": "",

    "samples": Map({}),
    "analysisCards": List([]),

    "ui": Map({
        "currentTab": 0,
        "lastTab": 0,

        "isPending": false,
        "isGroupedByPopulation": false,
        "viewMode": 0, // 0 - all, 1 - global search & selected, 2 - selected only
        "searchString": "",

        "mapCenterLat": 59.938043,
        "mapCenterLng": 30.337157,
        "mapZoom": 3,
    }),
});

export default initialState;
