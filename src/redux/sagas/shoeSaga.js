import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* shoeSaga(action) {
    console.log('Hit the shoe saga', action);
    const payload = action.payload
    try {
      // Attempt to get brand
      const response = yield axios.get(`/api/user/collection/details/${payload}`)
      console.log(response);
      const action = { type: 'SET_SHOE', payload: response.data };
      console.log(action);
      yield put(action);
    }
    catch (error) {
      console.log(`Couldn't get shoe`, error);
    }
}

function* shoe() {
    yield takeLatest('GET_SHOE', shoeSaga);
  }

export default shoe;