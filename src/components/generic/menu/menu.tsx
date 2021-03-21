import React = require('react');

interface IProps {
	buttonLabel: React.ElementType
	className?: string
}

const Menu: React.FC<IProps> = (props) => {
	const [displayed, toggleDisplayed] = React.useReducer(toggleState, false);

	return <>
		<button
			className={`menu-button ${props.className || ''}`}
			onClick={toggleDisplayed}
		>
			<props.buttonLabel/>
		</button>
		<nav className={`main-menu ${props.className || ''} ${displayed ? '' : 'collapsed'} `}>
			{createList(props.children, toggleDisplayed)}
		</nav>
	</>;
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

const toggleState = (state: boolean) => {
	return !state;
};
