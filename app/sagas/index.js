import {fork} from 'redux-saga/effects'
import {watchLogin, watchRegister} from './logOrRegSaga';

export default function* rootSaga(){
	yield fork(watchLogin);
	yield fork(watchRegister);
}