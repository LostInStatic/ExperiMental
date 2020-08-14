import React = require('react');
import './pages.scss';

interface IProps {
	pages: Array<{ name: string, content: string | React.ReactElement }>
}

const Pages: React.FC<IProps> = (props) => {

	const [activePage, setActivePage] = React.useState(0);

	return <>
		<div className="pages-controls">
			{props.pages.map(
				(page, index) => {
					return <button
						onClick={() => { setActivePage(index); }}
						key={'page' + index.toString()}>
						{page.name}
					</button>;
				}
			)}
		</div>
		<div className="pages-content">{props.pages[activePage].content}</div>
	</>;
};


export default Pages;