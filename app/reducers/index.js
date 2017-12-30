import {combineReducers} from 'redux';
import admin from './admin';
import {tagArticleReducers as front} from './front'

const initialState = {
	isFetching: false,  
	msg: {
		type: 1,        //0失败,1成功
		content: ''
	},
	userInfo: {}
};

export const actionsTypes = {
	FETCH_START: "FETCH_START",
	FETCH_END: "FETCH_END",
	USER_LOGIN: "USER_LOGIN",
	USER_REGISTER: "USER_REGISTER",
	SET_MESSAGE: "SET_MESSAGE",
	RESPONSE_USER_INFO: "RESPONSE_USER_INFO",
	USER_AUTH: "USER_AUTH"  //自动登录
};

export const actions = {
	user_login: function(username, password){
		return{
			type: actionsTypes.USER_LOGIN,
			username,
			password
		}
	},
	user_register: function(data){
		return{
			type: actionsTypes.USER_REGISTER,
			data
		}
	},
    clear_msg: function(){
        return{
            type: actionsTypes.SET_MESSAGE,
            msgType: 1,
            msgContent: ''
        }
    },
    user_auth: function(){
    	return{
    		type: actionsTypes.USER_AUTH
    	}
    }
};

export function reducer(state=initialState, action){
	switch(action.type){
		case actionsTypes.FETCH_START:
			return{
				...state, isFetching: true
			};
		case actionsTypes.FETCH_END:
			return{
				...state, isFetching: false
			};
		case actionsTypes.SET_MESSAGE:
			return{
				...state,
				isFetching: false,
				msg: {
					type: action.msgType,
					content: action.msgContent
				}
			};
		case actionsTypes.RESPONSE_USER_INFO:
            return {
                ...state, userInfo: action.data
            };
		default:
			return state;
	}
}

export default combineReducers({
	globalState: reducer,
	admin,
	front
})