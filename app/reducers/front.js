const initState = {
	articlesList: [],
	total: 0,
	pageNum: 1,
	articleDetail: {}
}

export const actionsTypes = {
	GET_TAG_ARTICLES: 'GET_TAG_ARTICLES',
	RESPONSE_TAG_ARTICLE: 'RESPONSE_TAG_ARTICLE',
	GET_ARTICLE_DETAIL: 'GET_ARTICLE_DETAIL',
	RESPONSE_ARTICLE_DETAIL: 'RESPONSE_ARTICLE_DETAIL'
};

export const actions = {
	get_tag_articles: function(tag = '', pageNum = 1){
		return{
			type: actionsTypes.GET_TAG_ARTICLES,
			tag,
			pageNum
		}
	},
	get_article_detail: function(id){
		return{
			type: actionsTypes.GET_ARTICLE_DETAIL,
			id
		}
	}
};

export function tagArticleReducers(state=initState, action){
	switch(action.type){
		case actionsTypes.RESPONSE_TAG_ARTICLE:
			return{
				...state,
				articlesList: action.data.articlesList,
				total: action.data.total,
				pageNum: action.data.pageNum
			};
		case actionsTypes.RESPONSE_ARTICLE_DETAIL:
			return{
				...state, articleDetail: action.data
			};
		default:
			return state;
	}
}