import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reactGramReducer from './reactGramReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  login: authReducer.login,
  register: authReducer.register,
  logout: authReducer.logout,
  reactgram: reactGramReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
