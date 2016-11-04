import {Map} from 'immutable';
import _t from '../../store/action_types';
import initialState from '../../store/initial_state';

export function toggleGroupByPopulation(groupByPopulations) {
    return {
        type: _t.DATASET_TOGGLE_POPULATION_VIEW,
        payload: groupByPopulations
    }
}

export function toggleViewMode() {
    return {
        type: _t.DATASET_SET_VIEW_MODE
    }
}

export function selectSample(sampleId) {
    return {
        type: _t.DATASET_SELECT_SAMPLE,
        payload: sampleId
    }
}

export function changeSearchString(string) {
    return {
        type: _t.DATASET_CHANGE_SEARCH_STRING,
        payload: string
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case _t.DATASET_TOGGLE_POPULATION_VIEW:
            return state.set("isGroupedByPopulation", action.payload);

        case _t.DATASET_SELECT_SAMPLE:
            return state.updateIn(["samples", action.payload, "selected"], s => !s);

        case _t.DATASET_SET_VIEW_MODE:
            return state.update("viewMode", viewMode => (viewMode + 1) % 3);

        case _t.DATASET_CHANGE_SEARCH_STRING:
            return state.set("searchString", action.payload);

        case _t.DATASET_PENDING:
            return state.set("isPending", true);

        case _t.DATASET_RECEIVED:
            const newSamples = action.payload.samples.reduce((pack, sample) => {
                sample.selected = (Math.random() < 0.05);
                pack[sample.id] = sample
                return pack;
            }, {});

            return state
                .update("samples", samples => samples.merge(newSamples))
                .set("isPending", false);

        default:
            return state;
    }
};

export default reducer;
