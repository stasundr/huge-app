import {connect} from 'react-redux';
import component from './view';
import {toggleGroupByPopulation, toggleViewMode, selectSample, changeSearchString} from './controller';

function mapStateToProps(state) {
    return {
        samples: state.get("samples"),
        isGroupedByPopulation: state.get("isGroupedByPopulation"),
        viewMode: state.get("viewMode"),
        searchString: state.get("searchString").toLowerCase(),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleGroupByPopulation: (groupByPopulations) => dispatch(toggleGroupByPopulation(groupByPopulations)),
        toggleViewMode: () => dispatch(toggleViewMode()),
        selectSample: (sampleId) => dispatch(selectSample(sampleId)),
        changeSearchString: (string) => dispatch(changeSearchString(string))
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(component);

export default connectedComponent;
