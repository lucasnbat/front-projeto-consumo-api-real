import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'REACT-BASE', // nome da app
      storage, // onde vai ser salvo, no caso é no storage do navegador
      whitelist: ['example'], // reducers que eu quero que persistam
    },
    reducers,
  );

  return persistedReducers;
};
