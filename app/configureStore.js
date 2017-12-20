import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/index';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

export default function(initialState = {}){
	const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
	sagaMiddleware.run(rootSaga);
	return store
}