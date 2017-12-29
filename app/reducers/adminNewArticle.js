const initState = {
	title: '',
	content: '',
	tags: [],
	id: ''
};

export const actionsTypes = {
	UPDATE_TITLE: 'UPDATE_TITLE',
	UPDATE_CONTENT: 'UPDATE_CONTENT',
	UPDATE_TAGS: 'UPDATE_TAGS',
	SAVE_ARTICLE: 'SAVE_ARTICLE',
	SET_ID: 'SET_ID'
};

export const actions = {
	update_title: function(title){
		return{
			type: actionsTypes.UPDATE_TITLE,
			title
		}
	},
	update_content: function(content){
		return{
			type: actionsTypes.UPDATE_CONTENT,
			content
		}
	},
	update_tags: function(tags){
		return{
			type: actionsTypes.UPDATE_TAGS,
			tags
		}
	},
	save_article: function(data){
		return{
			type: actionsTypes.SAVE_ARTICLE,
			data
		}
	}
};

export function newArticleReducers(state = initState, action){
	switch(action.type){
		case actionsTypes.UPDATE_TITLE:
			return{
				...state, title: action.title
			}
		case actionsTypes.UPDATE_CONTENT:
		    return{
		    	...state, content: action.content
		    }
		case actionsTypes.UPDATE_TAGS:
			return{
				...state, tags: action.tags
			}
		case actionsTypes.SET_ID:
			return{
				...state, id: action.id
			}
		default:
			return state;
	}
}