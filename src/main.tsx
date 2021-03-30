
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import { DataProvider } from './components/dataProvider';
import Category from './components/category/select';

/// #if PRODUCTION
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();
/// #else
console.info('devbuild');
/// #endif
const urlParams = new URLSearchParams(window.location.search);

ReactDOM.render(
	<DataProvider>
		<Category/>
	</DataProvider>,
	document.getElementById('root')
);
