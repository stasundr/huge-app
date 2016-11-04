import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';
import _t from './store/action_types';
import MainTabs from './components/main_tabs';

injectTapEventPlugin(); // http://stackoverflow.com/a/34015469/988941

store.dispatch({
    type: _t.DATASET_REQUESTED,
    payload: {
        url: window.location.href,
        page: 0
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <MainTabs/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);