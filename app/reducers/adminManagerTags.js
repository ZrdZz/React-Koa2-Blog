const initState = ['首页'];

export const actionsTypes = {
	ADD_TAG: 'ADD_TAG',
	DELETE_TAG: 'DELETE_TAG',
	SET_TAGS: 'RESPONSE_GET_ALL_TAGS',
	GET_ALL_TAGS: 'GET_ALL_TAGS'
};

export const actions = {
	add_tag: function(name){
		return{
			type: actionsTypes.ADD_TAG,
			name
		}
	},
	delete_tag: function(name){
		return{
			type: actionsTypes.DELETE_TAG,
			name
		}
	},
	get_all_tags: function(){
		return{
			type: actionsTypes.GET_ALL_TAGS
		}
	}
};

export function tagReducers(state=initState, action){
	switch(action.type){
		case actionsTypes.SET_TAGS:
			return['首页', ...action.data];
		default:
			return state;
	}
} 