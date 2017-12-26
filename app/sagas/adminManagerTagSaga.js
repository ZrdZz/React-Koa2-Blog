import {put, take, call} from 'redux-saga/effects';
import {post, get} from '../fetch/fetch';
import {actionsTypes} from '../reducers/index';
import {actionsTypes as managerTagActionsTypes} from '../reducers/adminManagerTags';

export function* watch_get_all_tags(){
	while(true){
		yield take(managerTagActionsTypes.GET_ALL_TAGS);
		let res = yield call(getAllTags);
		if(res.code === 0){
			let tagsTypeArr = [];
			for(let i = 0, len = res.data.length; i < len; i++){
				tagsTypeArr.push(res.data[i].name);
			}
			yield put({type: managerTagActionsTypes.SET_TAGS, data: tagsTypeArr});
		}else if(res.message === '身份信息已过期,请重新登录'){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
			setTimeout(function(){
				location.replace('/')
			}, 1000)
		}else{
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
		}
	}

}

export function* getAllTags(){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(get, 'getAllTags');
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAHE, msgContent: '网络请求错误'}, msgType: 0);
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}
}

export function* watchAddTag(){
	while(true){
		let req = yield take(managerTagActionsTypes.ADD_TAG);
		let res = yield call(addTag, req.name);
		if(res.code === 0){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
			yield put({type:managerTagActionsTypes.GET_ALL_TAGS});
		}else if(res.message === '身份信息已过期,请重新登录'){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
			setTimeout(function(){
				location.replace('/')
			}, 1000)
		}else{
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
		}
	}
}

export function* addTag(name){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(post, '/admin/tag/addTag', {name});
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}
}

export function* watchDeleteTag(){
	while(true){
		let req = yield take(managerTagActionsTypes.DELETE_TAG);
		let res = yield call(deleteTag, req.name);
		if(res.code === 0){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
			yield put({type:managerTagActionsTypes.GET_ALL_TAGS});
		}else if(res.message === '身份信息已过期,请重新登录'){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
			setTimeout(function(){
				location.replace('/')
			}, 1000)
		}else{
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
		}
	}
}

export function* deleteTag(name){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(post, '/admin/tag/deleteTag', {name});
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}
}