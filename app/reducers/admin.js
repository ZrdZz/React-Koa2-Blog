import {combineReducers} from 'redux';
import {userReducers} from './adminManagerUser';
import {tagReducers} from './adminManagerTags';
import {newArticleReducers} from './adminNewArticle';

const admin = combineReducers({
	userReducers,
	tagReducers,
	newArticleReducers
});

export default admin

