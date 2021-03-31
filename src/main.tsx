
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import { DataProvider } from './components/dataProvider';
import Category from './components/category/current';
import { BrowserRouter as Router, Switch, Route, Redirect, match, withRouter } from 'react-router-dom';

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
				<Route exact strict path='*/:slug'>
					<Category />
				</Route>
				<Route>
					<Redirect to='./default' />
				</Route>
			</Switch>
		</DataProvider>
	</Router>,
	document.getElementById('root')
);
