import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* imgSaga(action) {
    console.log('Hit the img saga', action.payload);
    try {
      // Attempt to send img
      const data = new FormData();
      data.append('file', action.payload);
      const response = yield axios.post('/api/aws/images', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': action.payload.type,
    }})
      console.log(response);
      const sendAction = {type: 'SEND_ID', payload: response.data.id};
      console.log(sendAction);
      yield put(sendAction);
    }
    catch (error) {
        console.log('error uploading file: ', error)
    }
}

function* image() {
    yield takeLatest('ADD_IMG', imgSaga);
  }

export default image;