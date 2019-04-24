import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* collectionSaga(action) {
    console.log('Hit the collection', action);
    try {
      // Attempt to get collection
      const response = yield axios.get('/api/user/collection/')
      console.log(response);
      const action = { type: 'SET_COLLECTION', payload: response.data };
      console.log(action);
      yield put(action);
    }
    catch (error) {
      console.log(`Couldn't get collection`, error);
    }
}

function* collection() {
    yield takeLatest('GET_COLLECTION', collectionSaga);
  }

export default collection;