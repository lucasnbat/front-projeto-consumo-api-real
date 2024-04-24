/**
 * Basicamente um arquivo para juntar todos os reducers
 * e disponibiliza-los para uso
 */

import { combineReducers } from 'redux';

import exampleReducer from './example/reducer';

export default combineReducers({
  example: exampleReducer,
});
