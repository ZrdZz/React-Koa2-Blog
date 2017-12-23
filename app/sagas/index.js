import {fork} from 'redux-saga/effects';
import {watchLogin, watchRegister, userAuth} from './logOrRegSaga';
import {watch_get_all_users} from './adminManagerUserSaga';

export default function* rootSaga(){
	yield fork(watchLogin);
	yield fork(watchRegister);
	yield fork(userAuth);
	yield fork(watch_get_all_users);
}