import React = require('react');
import { ReactComponent as Cross } from '../../../resources/X.svg';

interface IProps {
	onClick: (e?:React.MouseEvent) => void
}

const CloseButton: React.FC<IProps> = (props) => {

	return <button
		className='modal_box-close'
		onClick={props.onClick}
	>
		<Cross />
	</button>;
};

export default CloseButton;