import React = require('react');
import './dropdown.scss';

interface IProps {
	buttonText: string
}

const Dropdown: React.FC<IProps> = (props) => {

	const [expanded, toggle] = React.useReducer(manageToggle, false);

	return <div className="dropdown">
		<button
			onClick={toggle}
		>
			{props.buttonText}
			{expanded ?
				<i className="dropdown_arrow up" /> :
				<i className="dropdown_arrow down" />
			}
		</button>
		<div className={'dropdown_content ' + (expanded ? '' : 'collapsed')}>
			{props.children}
		</div>
	</div>;
};

const manageToggle = (state: boolean) => {
	return !state;
};

export default Dropdown;