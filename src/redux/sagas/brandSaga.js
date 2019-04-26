import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* brandSaga(action) {
    console.log('Hit the brand saga', action);
    try {
      // Attempt to get brand
      const response = yield axios.get('/api/brand/')
      console.log(response);
      const setAction = { type: 'SET_BRAND', payload: response.data };
      console.log(setAction);
      yield put(setAction);
    }
    catch (error) {
      console.log(`Couldn't get brands`, error);
    }
}

function* brand() {
    yield takeLatest('GET_BRAND', brandSaga);
  }

export default brand;