import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'meetup',
      storage: AsyncStorage,
      whitelist: ['auth', 'user', 'meetups'],
    },
    reducers
  );

  return persistedReducer;
};
