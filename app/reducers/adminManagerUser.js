const initState = {
	list:[],
	pageNum: 1,
	total: 0
};

export const actionsTypes = {
    'GET_ALL_USERS': "GET_ALL_USERS",
    'RESOLVE_GET_ALL_USERS': "RESOLVE_GET_ALL_USERS"
};

export const actions = {
	get_all_users: function(pageNum = 1){
		return{
			type: actionsTypes.GET_ALL_USERS,
			pageNum: pageNum
		}
	}
};

export function userReducers(state = initState, action){
	switch(action.type){
        case actionsTypes.RESOLVE_GET_ALL_USERS:
            return {
                list: action.data.list,
                pageNum: action.data.pageNum,
                total:action.data.total
            };
		default:
			return state;
	}
};