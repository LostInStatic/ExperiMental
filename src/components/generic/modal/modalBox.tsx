import React = require('react');
import { createPortal } from 'react-dom';

interface IProps {
	className?: string
	displayed: boolean
	closeButton?: boolean
}

const ModalBox: React.FC<IProps> = (props) => {

	const modal = <div className={`modal_box ${props.className || ''} ${(props.displayed ? '' : 'collapsed')}`}>
		<div
			className='modal_box-content'
			onClick={e => e.stopPropagation()}
			
		>
			{props.children}
		</div>

	</div>;

	return <>
		{
			createPortal(modal, document.getElementById('modals'))
		}

	</>;
};

export default ModalBox;