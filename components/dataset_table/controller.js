import {List, Map} from 'immutable';
import _t from '../../store/action_types';
import initialState from '../../store/initial_state';

export function toggleGroupByPopulation() {
    return {
        type: _t.DATASET_TOGGLE_POPULATION_VIEW
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

export function selectSamples(samples, checkboxState) {
    return {
        type: _t.DATASET_SELECT_SAMPLES,
        payload: {
            samples,
            checkboxState
        }
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
            return state.update("isGroupedByPopulation", s => !s);

        case _t.DATASET_SELECT_SAMPLE:
            return state.updateIn(["samples", action.payload, "selected"], s => !s);

        case _t.DATASET_SELECT_SAMPLES:
            return action.payload.samples.reduce(
                (newState, sample) => newState.setIn(
                    ["samples", sample.get("id"), "selected"],
                    action.payload.checkboxState
                ),
                state
            );

        case _t.DATASET_SET_VIEW_MODE:
            return state.update("viewMode", viewMode => (viewMode + 1) % 3);

        case _t.DATASET_CHANGE_SEARCH_STRING:
            return state.set("searchString", action.payload);

        case _t.DATASET_PENDING:
            return state.set("isPending", true);

        case _t.DATASET_RECEIVED:
            const newSamples = action.payload.samples.reduce((pack, sample) => {
                sample = Map(sample);
                return pack.set(sample.get("id"), sample.set("selected", false));
            }, Map({}));

            return state
                .update("samples", samples => samples.merge(newSamples))
                .set("isPending", false);

        default:
            return state;
    }
};

export default reducer;
