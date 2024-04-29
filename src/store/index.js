import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import persistedReducers from './modules/reduxPersist';

// createStore recebe o reducer
// reducer escuta a ação feita, cria novo estado que copia o estado atual
// modifica esse novo estado com as alterações da ação
// retorna o novo estado
// state é o estado inicial

import rootReducer from './modules/rootReducer'; // importa os reducers responsaveis pelas ações
import rootSaga from './modules/rootSaga'; // importa os sagas responsaveis por escutar e chamar as funções que passam os types e acionam os reducers

// criando o middleware saga
const sagaMiddleware = createSagaMiddleware();

// criando o store, passando reducer e middleware saga
// os reducers devem estar envolvidos com o persistedReducers
const store = createStore(persistedReducers(rootReducer), applyMiddleware(sagaMiddleware));

// linha adicional para rodar o middleware saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
