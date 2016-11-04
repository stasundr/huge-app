import {connect} from 'react-redux';
import {List, Map} from 'immutable';

import component from './view';
import {mapUpdateState} from './controller';

function mapStateToProps(state) {
    const markers = List(state.get("samples"))
        .map(sample => sample[1]) // [0] - id, [1] - sample data,
        .filter(s => (s.get("selected")))
        .filter(e => parseFloat(e.get("lat")) && parseFloat(e.get("lng")));
    const nodes = markers.map(marker => `${marker.get("lat")}, ${marker.get("lng")}`);
    let counts = {};
    nodes.forEach(node => counts[node] = counts[node] ? counts[node] + 1 : 1);

    return {
        markers,
        counts,

        mapCenterLat: state.getIn(["ui", "mapCenterLat"]),
        mapCenterLng: state.getIn(["ui", "mapCenterLng"]),
        mapZoom: state.getIn(["ui", "mapZoom"]),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mapUpdateState: (mapCenterLat, mapCenterLng, mapZoom) => dispatch(mapUpdateState(mapCenterLat, mapCenterLng, mapZoom)),
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(component);

export default connectedComponent;
