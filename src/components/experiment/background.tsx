import React = require('react');
import { ReactComponent as Background1 } from '../../resources/experiment-backgrounds/1.svg';
import { ReactComponent as Background2 } from '../../resources/experiment-backgrounds/2.svg';
import { ReactComponent as Background3 } from '../../resources/experiment-backgrounds/3.svg';
import { ReactComponent as Background4 } from '../../resources/experiment-backgrounds/4.svg';
import { ReactComponent as Background5 } from '../../resources/experiment-backgrounds/5.svg';
import { ReactComponent as Background6 } from '../../resources/experiment-backgrounds/6.svg';
import { ReactComponent as Background7 } from '../../resources/experiment-backgrounds/7.svg';
import { ReactComponent as Background8 } from '../../resources/experiment-backgrounds/8.svg';
import { ReactComponent as Background9 } from '../../resources/experiment-backgrounds/9.svg';
import { ReactComponent as Background10 } from '../../resources/experiment-backgrounds/10.svg';
import { useData } from '../dataProvider';
import { IExperimentsData } from '../../api/fetchExperiments';

interface IProps {
	experiment: IExperimentsData
}

const Background: React.FC<IProps> = (props) => {

	const Background = getBackground(props.experiment.backgroundImageUrl);

	return <Background className="experiment-background" />;
};

export default Background;

const backgrounds: React.ElementType<any>[] = [
	Background1,
	Background2,
	Background3,
	Background4,
	Background5,
	Background6,
	Background7,
	Background8,
	Background9,
	Background10,
];

const getBackground = (url: string): React.ElementType<any> => {
	if (url) {
		return () => Img(url);
	} else {
		return backgrounds[Math.floor(
			Math.random() * backgrounds.length
		)];
	}
};

const Img = (props) => {
	return <img src={props}></img>;
};