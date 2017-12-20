import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/main.js';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import './reset.css'

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>,
	document.getElementById('root')
);