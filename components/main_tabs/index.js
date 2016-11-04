import {connect} from 'react-redux';
import component from './view';
import {selectTab} from './controller';

function mapStateToProps(state) {
    return {
        currentTab: state.getIn(["ui", "currentTab"])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectTab: (tab) => dispatch(selectTab(tab))
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(component);

export default connectedComponent;
