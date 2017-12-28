import {combineReducers} from 'redux';
import {userReducers} from './adminManagerUser';
import {tagReducers} from './adminManagerTags';
import {newArticleReducers} from './adminNewArticle';
import {articleReducers} from './adminManagerArticle';

const admin = combineReducers({
	userReducers,
	tagReducers,
	newArticleReducers,
	articleReducers
});

export default admin

