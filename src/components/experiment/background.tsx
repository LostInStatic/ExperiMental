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

interface IProps {

}

const Background: React.FC<IProps> = (props) => {

	const RandomBackground = backgrounds[Math.floor(
		Math.random() * backgrounds.length
	)];

	return <RandomBackground className="experiment-background"/>;
};

export default Background;

const backgrounds = [
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