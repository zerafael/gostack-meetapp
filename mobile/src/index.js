import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

function Index() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" background="rgba(0, 0, 0, 0.3)" />
          <App />
        </PersistGate>
      </Provider>
    </>
  );
}

export default Index;
