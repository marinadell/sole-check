import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* addShoeSaga(action) {
    console.log('Hit the collection', action);
    try {
      // Attempt to get collection
      const response = yield axios.post('/api/user/collection/', action.payload)
      console.log(response);
      yield put('GET_COLLECTION');
    }
    catch (error) {
      console.log(`Couldn't add shoe`, error);
    }
}

function* addShoe() {
    yield takeLatest('ADD_SHOE', addShoeSaga);
  }

export default addShoe;