import React from 'react';

export default class Marker extends React.Component {
    render() {
        const icon = (this.props.number > 1) ? 'fa fa-group fa-lg' : 'fa fa-user fa-lg';

        return (
            <i className={icon}/>
        )
    }
}