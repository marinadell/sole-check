import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* colorSaga(action) {
    console.log('Hit the color saga', action);
    try {
      // Attempt to get color
      const response = yield axios.get('/api/color/')
      console.log(response);
      const action = { type: 'SET_COLOR', payload: response.data };
      console.log(action);
      yield put(action);
    }
    catch (error) {
      console.log(`Couldn't get colors`, error);
    }
}

function* color() {
    yield takeLatest('GET_COLOR', colorSaga);
  }

export default color;