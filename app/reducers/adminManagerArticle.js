const initState = {
	articlesList: [],
	total: 0,
	pageNum: 1
};

export const actionsTypes = {
	GET_ALL_ARTICLES: 'GET_ALL_ARTICLES',
	RESOLVE_GET_ALL_ARTICLES: 'RESOLVE_GET_ALL_ARTICLES',
	EDIT_ARTICLE: 'EDIT_ARTICLE'
};

export const actions = {
	get_all_articles: function(pageNum = 1){
		return{
			type: actionsTypes.GET_ALL_ARTICLES,
			pageNum: pageNum
		}
	},
	edit_article: function(id){
		return{
			type: actionsTypes.EDIT_ARTICLE,
			id
		}
	}
};

export function articleReducers(state = initState, action){
	switch(action.type){
		case actionsTypes.RESOLVE_GET_ALL_ARTICLES:
			return{
				articlesList: action.data.articlesList,
                pageNum: action.data.pageNum,
                total:action.data.total
			}
		default:
			return state;
	}
}