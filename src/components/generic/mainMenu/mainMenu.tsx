import React = require('react');
import Modal from '../modal/modal';
import './mainMenu.scss';
//@ts-expect-error
import {ReactComponent as Icon} from './menu-icon.svg';

interface IProps {

}

const MainMenu: React.FC<IProps> = (props) => {
	return <Modal
		buttonSymbol={<Icon/>}
		className="menu">
		<nav className ="main-menu">
			{createList(props.children)}
		</nav>
	</Modal>;
};

export default MainMenu;

const createList = (children: React.ReactNode) => {
	return <ul>
		{React.Children.map(
			children,
			child => {
				return <li>{child}</li>;
			})}
	</ul>;
};