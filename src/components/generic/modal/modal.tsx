import React = require('react');
import './modal.scss';

interface IProps {
	buttonSymbol: React.ReactNode | string
	className?: string
	externalState?: {
		displayed: boolean
		manageExternalState: (state:boolean) => void
	}

}

const Modal: React.FC<IProps> = (props) => {

	const [displayed, toggle] = props.externalState ?
		[props.externalState.displayed, props.externalState.manageExternalState] :
		React.useState(false);

	return <>
		<button
			className={props.className}
			onClick={() => toggle(true)}
		>
			{props.buttonSymbol}
		</button>
		<div className={`modal_box ${props.className || ''} ${(displayed ? '' : 'collapsed')}`}>
			<button
				className='modal_box-close'
				onClick={() => toggle(false)}
			>
				✖
			</button>
			<div className='modal_box-content'>
				{props.children}
			</div>

		</div>
	</>;
};

export default Modal;