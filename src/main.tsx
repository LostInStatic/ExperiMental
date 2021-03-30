
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import { DataProvider } from './components/dataProvider';
import Category from './components/category/current';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

/// #if PRODUCTION
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();
/// #else
console.info('devbuild');
/// #endif
const urlParams = new URLSearchParams(window.location.search);

ReactDOM.render(
	<Router>
		<DataProvider>
			<Switch>
				<Route path='/:slug'><Category /></Route>
			</Switch>
		</DataProvider>
	</Router>,
	document.getElementById('root')
);
