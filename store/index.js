import {createStore, applyMiddleware} from 'redux';
import createLoggerMiddleware from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {Iterable} from 'immutable';

import initialState from './initial_state';
import reducer from './reducer';
import sagas from './sagas';

const stateTransformer = (state) => (Iterable.isIterable(state)) ? state.toJS() : state;
const loggerMiddleware = createLoggerMiddleware({stateTransformer});
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(loggerMiddleware, sagaMiddleware);
const store = createStore(reducer, initialState, enhancer);

sagaMiddleware.run(sagas);

export default store;
