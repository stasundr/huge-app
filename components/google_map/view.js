import React from 'react';
import GoogleMap from 'google-map-react';

import Marker from '../map_marker';

const toolbarHeight = 45;

export default class AppGoogleMap extends React.Component {
    constructor() {
        super();
        this.state = {
            mapCenterLat: 0,
            mapCenterLng: 0,
            mapZoom: 3,
        };
    }

    componentDidMount() {
        const {
            mapCenterLat,
            mapCenterLng,
            mapZoom,
        } = this.props;

        this.setState({
            mapCenterLat,
            mapCenterLng,
            mapZoom,
        });
    }

    // componentDidUpdate(props, state)  {
    //     const {
    //         mapUpdateState,
    //     } = props;
    //
    //     mapUpdateState(
    //         state.mapCenterLat,
    //         state.mapCenterLng,
    //         state.mapZoom,
    //     );
    // }

    _onClick({x, y, lat, lng, event}) {
        this.setState({
            mapCenterLat: lat,
            mapCenterLng: lng,
        })
    }

    _onChange({center, zoom, bounds, marginBounds}) {
        this.setState({
            mapCenterLat: center.lat,
            mapCenterLng: center.lng,
            mapZoom: zoom,
        })
    }

    render() {
        const {markers, counts} = this.props;

        return (
            <div style={{marginLeft: 0, height: window.innerHeight - toolbarHeight}}>
                <GoogleMap
                    bootstrapURLKeys={{key: "AIzaSyCvXDv3NmjBC2D85QIKJ8ZmKq-K9jCuZ5A"}}
                    center={[this.state.mapCenterLat, this.state.mapCenterLng]}
                    zoom={this.state.mapZoom}
                    onClick={this._onClick.bind(this)}
                    onChange={this._onChange.bind(this)}
                >
                    {
                        markers.map(e =>
                            <Marker
                                key={e.get("id")}
                                lat={e.get("lat")}
                                lng={e.get("lng")}
                                number={counts[`${e.get("lat")}, ${e.get("lng")}`]}
                            />
                        )
                    }
                </GoogleMap>
            </div>
        )
    }
}
