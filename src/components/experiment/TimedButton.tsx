import React = require('react');

interface IProps {
	seconds?: number
	onClick: () => void
	className?: string
}

const TimedButton: React.FC<IProps> = (props) => {

	const [secondsLeft, setTimeLeft] = React.useState(props.seconds ? props.seconds : 2);

	React.useEffect(() => {
		if (secondsLeft > 0) {
			const timer = setTimeout(() => {
				setTimeLeft(secondsLeft - 1);
			}, 1000);
			return () => clearTimeout(timer);
		}
	});

	return <button
		onClick={props.onClick}
		className={props.className}
		disabled={secondsLeft ? true : false}
	>
		{secondsLeft ? secondsLeft : props.children}
	</button>;
};



export default TimedButton;