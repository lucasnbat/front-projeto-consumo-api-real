import { all } from 'redux-saga/effects';

// importando o saga que criei e nomeando ele de example
import example from './example/sagas';

export default function* rootSaga() {
  return yield all([example]);
}
