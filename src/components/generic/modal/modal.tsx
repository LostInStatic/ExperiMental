import React = require('react');
import './modal.scss';

interface IProps {
	buttonSymbol: React.ReactNode|string
	className?: string
}

const Modal: React.FC<IProps> = (props) => {

	const [displayed, toggle] = React.useReducer(manageToggle, false);

	return <>
		<button
			className={props.className}
			onClick={toggle}
		>
			{props.buttonSymbol}
		</button>
		<div className={`modal_box ${props.className || ''} ${(displayed ? '' : 'collapsed')}`}>
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

export default Modal;