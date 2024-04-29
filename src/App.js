import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// abaixo os dois imports para trabalhar com redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Routes from './routes';
import history from './services/history';

/**
 * ToastContainer pode ter classe (opcional)
 */

/**
 * eu chamo uma das funções disponiveis em actions com o dispatch
 * lá na minha aplicação
 * a partir disso, o reducer altera o estado conforme o type da action
 * e o saga escuta a action e faz a chamada para as duas outras funções
 * que vão também retornar estados diferentes manipulados pelo reducer
 * a fim de mostrar se deu sucesso ou falha
 */

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
