import React = require('react');
import './modal.scss';
import { createPortal } from 'react-dom';

interface IProps {
	buttonSymbol: React.ReactNode | string
	className?: string
	externalState?: {
		displayed: boolean
		manageExternalState: (state: boolean) => void
	}

}

const Modal: React.FC<IProps> = (props) => {

	const [displayed, setDisplayed] = props.externalState ?
		[props.externalState.displayed, props.externalState.manageExternalState] :
		React.useState(false);

	const modal = <div className={`modal_box ${props.className || ''} ${(displayed ? '' : 'collapsed')}`}>
		<button
			className='modal_box-close'
			onClick={() => setDisplayed(false)}
		>
			✖
		</button>
		<div
			className='modal_box-content'
			onClick={e => e.stopPropagation()}
			
		>
			{props.children}
		</div>

	</div>;

	return <>
		<button
			className={props.className}
			onClick={() => setDisplayed(true)}
		>
			{props.buttonSymbol}
		</button>
		{
			createPortal(modal, document.getElementById('root'))
		}

	</>;
};

export default Modal;