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
			<div className='modal_box-content'>
				<button
					className='modal_box-close'
					onClick={toggle}
				>
					✖
				</button>
				{props.children}
			</div>

		</div>
	</>;
};

const manageToggle = (state: boolean) => {
	return !state;
};

export default Dropdown;