import {combineReducers} from 'redux';
import {userReducers} from './adminManagerUser';
import {tagReducers} from './adminManagerTags';

const admin = combineReducers({
	userReducers,
	tagReducers
});

export default admin

