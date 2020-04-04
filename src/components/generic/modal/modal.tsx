import React = require('react');
import './modal.scss';

interface IProps {
	buttonSymbol: string
}

const Dropdown: React.FC<IProps> = (props) => {

	const [expanded, toggle] = React.useReducer(manageToggle, false);

	return <>
		<button
			onClick={toggle}
		>
			{props.buttonSymbol}
		</button>
		<div className={'modal_box ' + (expanded ? '' : 'collapsed')}>
			<button
				className='modal_box-close'
				onClick={toggle}
			>
				✖
			</button>
			<div className='modal_box-content'>
				{props.children}
			</div>

		</div>
	</>;
};

const manageToggle = (state: boolean) => {
	return !state;
};

export default Dropdown;