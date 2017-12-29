import {put, take, call} from 'redux-saga/effects';
import {get, post} from '../fetch/fetch';
import {actionsTypes} from '../reducers/index';
import {actionsTypes as managerArticleActionsTypes} from '../reducers/adminManagerArticle';
import {actionsTypes as newArticleActionsTypes} from '../reducers/adminNewArticle';

export function* watchGetAllArticles(){
	while(true){
		let req = yield take(managerArticleActionsTypes.GET_ALL_ARTICLES);
		let pageNum = req.pageNum || 1;
		let res = yield call(getAllArticles, pageNum);
		if(res.code === 0){
			for(let i = 0, len = res.data.articlesList.length; i < len; i++){
				res.data.articlesList[i].key = i;
			}
			let data = {};
            data.total = res.data.total;
            data.articlesList  = res.data.articlesList;
            data.pageNum = pageNum;
			yield put({type: managerArticleActionsTypes.RESOLVE_GET_ALL_ARTICLES, data: data});
		}else if (res.message === '身份信息已过期，请重新登录') {
                yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                setTimeout(function () {
                    location.replace('/');
                }, 1000);
        }else{
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
		}
	}
}

export function* getAllArticles(pageNum){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(get, `/getAllArticles?pageNum=${pageNum}`);
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}
}

export function* watchEditArticle(){
	while(true){
		let req = yield take(managerArticleActionsTypes.EDIT_ARTICLE);
		let res = yield call(editArticle, req.id);
		if(res.code === 0){
			yield put({type: newArticleActionsTypes.SET_ID, id: res.data._id});
			yield put({type: newArticleActionsTypes.UPDATE_TITLE, title: res.data.title});
			yield put({type: newArticleActionsTypes.UPDATE_CONTENT, content: res.data.content});
			yield put({type: newArticleActionsTypes.UPDATE_TAGS, tags: res.data.tags});
		}else if (res.message === '身份信息已过期，请重新登录') {
                yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                setTimeout(function () {
                    location.replace('/');
                }, 1000);
        }else{
			yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
		}
	}
}

export function* editArticle(id){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(get, `/admin/article/editArticle?id=${id}`);
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0})
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}	
}