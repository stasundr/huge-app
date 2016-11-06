import {connect} from 'react-redux';
import {List, fromJS} from 'immutable';
import component from './view';
import {
    toggleGroupByPopulation,
    toggleViewMode,
    selectSample,
    selectSamples,
    changeSearchString
} from './controller';

function mapStateToProps(state) {
    const searchString = state.get("searchString").toLowerCase();
    const viewMode = state.get("viewMode");
    const samples = List(state.get("samples"))
        .map(sample => sample[1]) // sample[0] - id, sample[1] - sample data
        .filter(sample => {
            switch(viewMode) {
                case 0: return `${sample.get("id")} ${sample.get("population")}`.toLowerCase().match(searchString);
                case 1: return sample.get("selected") || `${sample.get("id")} ${sample.get("population")}`.toLowerCase().match(searchString);
                case 2: return sample.get("selected");
            }
        });
    const populations = fromJS(samples.reduce((pops, sample) => {
        if (!pops.some(p => p.population == sample.get("population")))
            pops.push({
                population: sample.get("population")
            });

        return pops;
    }, []));

    return {
        samples,
        populations,
        isGroupedByPopulation: state.get("isGroupedByPopulation"),
        viewMode,
        searchString,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleGroupByPopulation: () => dispatch(toggleGroupByPopulation()),
        toggleViewMode: () => dispatch(toggleViewMode()),
        selectSample: (sampleId) => dispatch(selectSample(sampleId)),
        selectSamples: (samples, checkboxState) => dispatch(selectSamples(samples, checkboxState)),
        changeSearchString: (string) => dispatch(changeSearchString(string))
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(component);

export default connectedComponent;
