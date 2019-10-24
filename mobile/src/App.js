import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import createRouter from './routes';

import { subscriptionsRequest } from './store/modules/subscriptions/actions';

function App() {
  const dispatch = useDispatch();
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  useEffect(() => {
    if (signed) {
      dispatch(subscriptionsRequest());
    }
  }, []); // eslint-disable-line

  return <Routes />;
}

export default App;
