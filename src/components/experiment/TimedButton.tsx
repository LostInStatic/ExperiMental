import React = require('react');
import Cookies from '../../cookiesProvider';

interface IProps {
	seconds: number
	isSuspended?: boolean
	onClick: () => void
	className?: string
	experimentID: string
}

const TimedButton: React.FC<IProps> = (props) => {

	const cookieName = `${props.experimentID}.timeLeft`;

	const previousTimeLeft = parseInt(Cookies.get(cookieName));

	const [secondsLeft, setTimeLeft] = React.useState(previousTimeLeft || props.seconds);

	React.useEffect(() => {
		if (secondsLeft > 0 && !props.isSuspended) {
			const timer = setTimeout(() => {
				setTimeLeft(secondsLeft - 1);
				Cookies.set(cookieName, secondsLeft.toString());
			}, 1000);
			return () => clearTimeout(timer);
		}
	});

	return <button
		onClick={props.onClick}
		className={`timer-button ${props.className}`}
		disabled={secondsLeft ? true : false}
	>
		{props.children}
		{createOverlay(secondsLeft)}
	</button>;
};


const createOverlay = (secondsLeft:number) => {
	if (secondsLeft) {
		return <div
			className="timer-overlay"
		>
			{secondsLeft}
		</div>;
	}
};



export default TimedButton;