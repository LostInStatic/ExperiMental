import React = require('react');
//@ts-expect-error
import { ReactComponent as Background } from '../resources/background.svg';
import { IExperimentMatchState } from './app';

interface IProps {
	experimentMatchStatus: IExperimentMatchState
}

const IndicatorBackground: React.FC<IProps> = (props) => {
	return <div
		className={
			'background-indicator ' +
			getIndicatorStatus(props)
		}
	>
		<Background />
	</div>;
};

export default IndicatorBackground;

const getIndicatorStatus = (props: IProps) => {
	const status = props.experimentMatchStatus;
	if (status.hasNonePicked) {
		return 'empty';
	} else if (status.isMatched) {
		return 'good';
	} else if (status.hasPartialMatch) {
		return 'neutral';
	} else return 'bad';
};