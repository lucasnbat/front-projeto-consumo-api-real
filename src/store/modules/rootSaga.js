import { all } from 'redux-saga/effects';

// importando o saga que criei e nomeando ele de example
import auth from './auth/sagas';

export default function* rootSaga() {
  return yield all([auth]);
}
