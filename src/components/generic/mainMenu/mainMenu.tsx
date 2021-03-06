import React = require('react');
import { ReactComponent as Icon } from '../../../resources/planet.svg';

interface IProps {

}

const MainMenu: React.FC<IProps> = (props) => {
	const [displayed, toggleDisplayed] = React.useReducer(toggleState, false);

	return <>
		<button
			className="main-menu_button"
			onClick={ toggleDisplayed }
		>
			<Icon />
		</button>
		<nav className={`main-menu${displayed ? '' : ' collapsed'} `}>
			{createList(props.children, toggleDisplayed)}
		</nav>
	</>;
};

export default MainMenu;

const createList = (children: React.ReactNode, onClick: () => void) => {
	return <ul>
		{React.Children.map(
			children,
			child => {
				return <li onClick={onClick}>{child}</li>;
			})}
	</ul>;
};

const toggleState = (state: boolean) => {
	return !state;
};
