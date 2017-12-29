 import {take, put, call, select} from 'redux-saga/effects';
import {post, get} from '../fetch/fetch';
import {actionsTypes} from '../reducers/index';
import {actionsTypes as newArticleActionsTypes} from '../reducers/adminNewArticle';

export function* watchSaveArticle(){
	while(true){
		let req = yield take(newArticleActionsTypes.SAVE_ARTICLE);
		if(req.data.title === ''){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: '文章标题不能为空!', msgType: 0});
		}else if(req.data.content === ''){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: '文章内容不能为空!', msgType: 0});
		}else if(req.data.tags.length === 0){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: '文章分类不能为空!', msgType: 0});
		}

		let res = yield call(saveArticle, req.data);
		if(res.code === 0){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
			setTimeout(function(){
				location.replace('/admin/managerArticle');
			}, 1000);
		}else if(res.message === '身份信息已过期，请重新登录'){
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
			setTimeout(function(){
				location.replace('/');
			}, 1000);
		}else{
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0})
		}
	}
}

export function* saveArticle(data){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(post, `/admin/article/addArticle?id=${data.id}`, data);
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: '0'});
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}
}