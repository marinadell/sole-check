import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* brandSaga(action) {
    console.log('Hit the brand saga', action);
    try {
      // Attempt to get brand
      const response = yield axios.get('/api/brand/')
      console.log(response);
      const action = { type: 'SET_BRAND', payload: response.data };
      console.log(action);
      yield put(action);
    }
    catch (error) {
      console.log(`Couldn't get brands`, error);
    }
}

function* brand() {
    yield takeLatest('GET_BRAND', brandSaga);
  }

export default brand;