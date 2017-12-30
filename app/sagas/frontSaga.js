import {put, call, take} from 'redux-saga/effects';
import {actionsTypes} from '../reducers/index';
import {get, post} from '../fetch/fetch';
import {actionsTypes as tagArticleActionsTypes} from '../reducers/front';

export function* watchGetTagArticles(){
	while(true){
		let req = yield take(tagArticleActionsTypes.GET_TAG_ARTICLES);
		let res = yield call(getTagArticles, req.tag, req.pageNum);
		if(res.code === 0){
			yield put({type: tagArticleActionsTypes.RESPONSE_TAG_ARTICLE, data: res.data})
		}else{
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
		}
	}
}

export function* getTagArticles(tag, pageNum){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(get, `/getAllArticles?pageNum=${pageNum}&tag=${tag}`);
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
	}finally{
		yield put({type: actionsTypes.FETCH_END})
	}
}

export function* watchGetArticleDetail(){
	while(true){
		let req = yield take(tagArticleActionsTypes.GET_ARTICLE_DETAIL);
		let res = yield call(getArticleDetail, req.id);
		if(res.code === 0){
			yield put({type: tagArticleActionsTypes.RESPONSE_ARTICLE_DETAIL, data: res.data})
		}else{
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0})
		}
	}
}

export function* getArticleDetail(id){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(get, `/getArticleDetail?id=${id}`);
	}catch(error){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
	}finally{
		yield put({type: actionsTypes.FETCH_END})
	}
}