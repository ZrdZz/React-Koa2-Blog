import {combineReducers} from 'redux';
import {userReducers} from './adminManagerUser';

const admin = combineReducers({
	userReducers
});

export default admin

