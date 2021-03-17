import React = require('react');
import Cookies from '../cookiesProvider';
import ModalBox from './generic/modal/modalBox';
const COOKIENAME_SEEN = 'welcomeSeen';

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
					Czy chcesz ciostka?
					<button onClick={() => {
						Cookies.allow();
						Cookies.set(COOKIENAME_SEEN, 'true');
						setClosed(true);
					}}>
						Tak
					</button>
					<button onClick={() => setClosed(true)}>
						Nie
					</button>
				</ModalBox>
		}
	</>;
};



export default Welcome;