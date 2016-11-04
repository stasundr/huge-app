import _t from '../../store/action_types';
import initialState from '../../store/initial_state';

export function selectTab(tab) {
    console.log(tab);
    return {
        type: _t.TAB_SELECT,
        payload: tab
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case _t.TAB_SELECT:
            return state.setIn(["ui", "currentTab"], action.payload);

        default:
            return state;
    }
};

export default reducer;
