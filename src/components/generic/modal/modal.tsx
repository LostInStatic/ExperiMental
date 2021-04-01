import React = require('react');
import ModalBox from './modalBox';
import { ReactComponent as Cross } from '../../../resources/X.svg';

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

	return <>
		<button
			className={props.className}
			onClick={() => setDisplayed(true)}
		>
			{props.buttonSymbol}
		</button>
		<ModalBox
			className={props.className}
			displayed={displayed}
		>
			<button
				className='modal_box-close'
				onClick={() => setDisplayed(false)}
			>
				<Cross/>
			</button>
			{props.children}
		</ModalBox>
	</>;
};

export default Modal;