import {fork} from 'redux-saga/effects';
import {watchLogin, watchRegister, userAuth} from './logOrRegSaga';
import {watch_get_all_users} from './adminManagerUserSaga';
import {watch_get_all_tags, watchAddTag, watchDeleteTag} from './adminManagerTagSaga';
import {watchSaveArticle} from './adminNewArticleSaga';

export default function* rootSaga(){
	yield fork(watchLogin);
	yield fork(watchRegister);
	yield fork(userAuth);
	yield fork(watch_get_all_users);
	yield fork(watch_get_all_tags);
	yield fork(watchAddTag);
	yield fork(watchDeleteTag);
	yield fork(watchSaveArticle);
}