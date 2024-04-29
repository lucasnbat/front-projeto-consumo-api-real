/**
 * Basicamente um arquivo para juntar todos os reducers
 * e disponibiliza-los para uso
 */

import { combineReducers } from 'redux';

import auth from './auth/reducer';

export default combineReducers({
  auth,
});
