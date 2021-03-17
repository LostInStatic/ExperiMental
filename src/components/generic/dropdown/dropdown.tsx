import React = require('react');
import './dropdown.scss';
import {ReactComponent as IconArrow} from '../../../resources/arrow.svg';

interface IProps {
	buttonLabel: string
}

const Dropdown: React.FC<IProps> = (props) => {
	const [displayed, toggleDisplayed] = React.useReducer(toggleState, false);

	return <>
		<button
			className={`arrow-button ${displayed ? 'up' : 'down'}`} 
			onClick={toggleDisplayed}
		>
			{props.buttonLabel}
			<IconArrow/>
		</button>
		<div className={
			`dropdown_content ${displayed ? '' : 'collapsed'
			}`
		}>
			{props.children}
		</div>
	</>;
};

export default Dropdown;


const toggleState = (state: boolean) => {
	return !state;
};
