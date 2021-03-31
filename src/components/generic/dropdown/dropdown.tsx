import React = require('react');
import { ReactComponent as IconArrow } from '../../../resources/arrow.svg';

interface IProps {
	buttonLabel: string
}

const Dropdown: React.FC<IProps> = (props) => {
	const [displayed, toggleDisplayed] = React.useReducer(toggleState, false);
	const [height, setHeight] = React.useState(0);
	const contentRef = React.useRef(null);

	React.useEffect(() => setHeight(contentRef.current.scrollHeight), [props.children]);
	return <>
		<button
			className={`arrow-button ${displayed ? 'up' : 'down'}`}
			onClick={toggleDisplayed}
		>
			{props.buttonLabel}
			<IconArrow />
		</button>
		<div
			ref={contentRef}
			className={
				`dropdown_content ${displayed ? '' : 'collapsed'
				}`
			}
			style={{ height: `${displayed ? height : 0}px` }}>
			{props.children}
		</div>
	</>;
};

export default Dropdown;


const toggleState = (state: boolean) => {
	return !state;
};
