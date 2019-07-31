import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './Reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import mySagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mySagas);

export default store;
