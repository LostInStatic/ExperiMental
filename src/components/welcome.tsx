import React = require('react');
import Cookies from '../cookiesProvider';
import ModalBox from './generic/modal/modalBox';
const COOKIENAME_SEEN = 'welcomeSeen';
import { ReactComponent as Sponsors } from '../resources/sponsors.svg';
import GirlGif from '../resources/girl.gif';

interface IProps {

}

const Welcome: React.FC<IProps> = () => {
	const [closed, setClosed] = React.useState(
		Cookies.get(COOKIENAME_SEEN) === 'true'
	);
	return <>
		{
			closed ?
				null
				:
				<ModalBox
					displayed={true}
				>
					
					<button onClick={() => {
						Cookies.set(COOKIENAME_SEEN, 'true', true);
						setClosed(true);
					}}>
						Zaczynamy!
					</button>
				</ModalBox>
		}
	</>;
};



export default Welcome;