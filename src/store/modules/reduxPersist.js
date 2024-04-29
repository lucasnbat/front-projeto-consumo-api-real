import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'CONSUMO-API', // nome da app
      storage, // onde vai ser salvo, no caso é no storage do navegador
      whitelist: ['auth'], // reducers que eu quero que persistam
    },
    reducers,
  );

  return persistedReducers;
};
