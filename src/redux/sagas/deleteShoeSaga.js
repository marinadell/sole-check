import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* deleteShoeSaga(action) {
  console.log('Hit the deleteShoeSaga', action);
  const id = action.payload.id
  try {
    // Attempt deleting project, then calling projectListSaga
    yield axios.delete(`/api/user/collection/details/${id}`);
  }
  catch (error) {
    // Log and alert if an error occurs
    console.log(`Couldn't delete shoe`, error);
    alert(`Sorry, couldn't delete your shoe. Try again later`);
  }
}

function* deleteShoe() {
    yield takeLatest('DELETE_SHOE', deleteShoeSaga);
  }

export default deleteShoe;;