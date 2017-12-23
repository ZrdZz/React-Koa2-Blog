import {take, put, call} from 'redux-saga/effects';
import {get} from '../fetch/fetch';
import {actionsTypes as managerUserActionsTypes} from '../reducers/adminManagerUser';
import {actionsTypes} from '../reducers/index';

export function* watch_get_all_users(){
	while(true){
		let req = yield take(managerUserActionsTypes.GET_ALL_USERS);
		let pageNum = req.pageNum || 1;
		let res = yield call(fetch_users, pageNum);
		if(res && res.code === 0){
			for(let i = 0, len = res.data.list.length; i < len; i++){
				res.data.list[i].key = i;
			}
			let data = {};
            data.total = res.data.total;
            data.list  = res.data.list;
            data.pageNum = pageNum;
            yield put({type:managerUserActionsTypes.RESOLVE_GET_ALL_USERS, data:data})
		}else{
			yield put({type:actionsTypes.SET_MESSAGE, msgContent:res.message, msgType:0});
		}
	}
}

export function* fetch_users(pageNum){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(get, `/admin/getUsers/?pageNum=${pageNum}`);
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: "网络请求错误", msgType: 0})
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}
}