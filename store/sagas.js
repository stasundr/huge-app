import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import {takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';

import _t from './action_types';

function* asyncDatasetFetch(action) {
    yield put({ type: _t.DATASET_PENDING });

    const payload = yield fetch('http://localhost:3000/api/v1/dataset', {
        method: 'POST',
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    }).then(response => response.json());

    yield put({ type: _t.DATASET_RECEIVED, payload });

    if (!payload.done) {
        yield put({
            type: _t.DATASET_REQUESTED,
            payload: {
                url: window.location.href,
                page: payload.page + 1
            }
        });
    }
}

function* watchDataset() {
    yield* takeEvery(_t.DATASET_REQUESTED, asyncDatasetFetch);
}

// Sagas watcher
function* rootSaga() {
    yield [
        watchDataset()
    ];
}

export default rootSaga;