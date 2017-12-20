import {put, take, call, fork} from 'redux-saga/effects';
import {actionsTypes} from '../reducers/index';
import {get, post} from '../fetch/fetch.js';

export function* watchLogin(){
	while(true){
		let req = yield take(actionsTypes.USER_LOGIN);                                       
		let res = yield call(login, req.username, req.password);
		if(res && res.code === 0){
			yield put({type: actionsTypes.SET_MESSAGE, msgType: 1, msgContent: '登陆成功'});
			yield put({type: actionsTypes.RESPONSE_USER_INFO, data: res.data});             
		}
	}
}

export function* login(username, password){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(post, '/user/login', {username, password});
	} catch(err) {
		yield put({type: actionsTypes.SET_MESSAGE, msgType: 0, msgContent: '用户名或密码错误'});
	} finally {
		yield put({type: actionsTypes.FETCH_END});
	}
}

export function* watchRegister(){
	while(true){
		let req = yield take(actionsTypes.USER_REGISTER);                                     
		let res = yield call(register, req.data);
		if(res && res.code === 0){
			yield put({type: actionsTypes.SET_MESSAGE, msgType: 1, msgContent: '注册成功'});           
		}else{
			yield put({type: actionsTypes.SET_MESSAGE, msgType: 0, msgContent: '用户名已存在'});
		}
	}	
}

export function* register(data){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(post, '/user/register', data);
	} catch(err) {
		yield put({type: actionsTypes.SET_MESSAGE, msgType: 0, msgContent: '注册失败'});
	} finally {
		yield put({type: actionsTypes.FETCH_END});
	}
}