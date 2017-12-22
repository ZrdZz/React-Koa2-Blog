import {fork} from 'redux-saga/effects';
import {watchLogin, watchRegister, userAuth} from './logOrRegSaga';

export default function* rootSaga(){
	yield fork(watchLogin);
	yield fork(watchRegister);
	yield fork(userAuth);
}