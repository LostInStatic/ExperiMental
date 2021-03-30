import React = require('react');
import ClickAwayListener from 'react-click-away-listener';

interface IProps {
	buttonLabel: React.ElementType
	className?: string
}

const Menu: React.FC<IProps> = (props) => {
	const [displayed, toggleDisplayed] = React.useReducer(toggleState, false);

	return <ClickAwayListener
		onClickAway={() => { toggleDisplayed(true);}}
	>
		<div>
			<button
				className={`menu-button ${props.className || ''}`}
				onClick={(e) => {
					toggleDisplayed(false);
				}}
			>
				<props.buttonLabel />
			</button>

			<div className={`menu ${props.className || ''} ${displayed ? '' : 'collapsed'} `}>
				{createList(props.children, () => toggleDisplayed(false))}
			</div>
		</div>
	</ClickAwayListener>;
};

export default Menu;

const createList = (children: React.ReactNode, onClick: () => void) => {
	return <ul>
		{React.Children.map(
			children,
			child => {
				return <li onClick={onClick}>{child}</li>;
			})}
	</ul>;
};

const toggleState = (state: boolean, forceClose: boolean) => {
	if (forceClose) return false;
	return !state;
};
