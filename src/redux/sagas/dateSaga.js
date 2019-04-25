import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* dateSaga(action) {
    console.log('Hit the date saga', action.payload.worn_date);
    const id = action.payload.id
    try {
      // Attempt to get brand
      const response = yield axios.put(`/api/user/collection/details/${id}`, action.payload)
      console.log(response);
      const getAction = { type: 'GET_SHOE', payload:id };
      console.log(getAction);
      yield put(getAction);
    }
    catch (error) {
      console.log(`Couldn't update shoe`, error);
    }
}

function* date() {
    yield takeLatest('UPDATE_DATE', dateSaga);
  }

export default date;