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
			getIndicatorState(props)
		}
	>
		<Background />
	</div>;
};

export default IndicatorBackground;

const getIndicatorState = (props: IProps) => {
	const state = props.experimentMatchStatus;
	if (state.isMatched) {
		return 'good';
	} else if (state.hasPartialMatch) {
		return 'neutral';
	} else return 'bad';
};