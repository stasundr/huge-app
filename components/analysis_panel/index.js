import {connect} from 'react-redux';
import component from './view';

function mapStateToProps(state) {
    return {
        cards: state.get("analysisCards")
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //toggleGroupByPopulation: (groupByPopulations) => dispatch(toggleGroupByPopulation(groupByPopulations)),
        //toggleViewMode: () => dispatch(toggleViewMode())
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(component);

export default connectedComponent;
