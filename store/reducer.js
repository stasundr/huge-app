import initialState from './initial_state';
import datasetReducer from '../components/dataset_table/controller';
import mapReducer from '../components/google_map/controller';
import tabsReducer from '../components/main_tabs/controller';

const reducer = (state = initialState, action) => {
    let newState = state;

    newState = datasetReducer(newState, action);
    newState = mapReducer(newState, action);
    newState = tabsReducer(newState, action);

    return newState;
};

export default reducer;