import React = require('react');
import Cookies from '../cookiesProvider';
import ModalBox from './generic/modal/modalBox';
const COOKIENAME_SEEN = 'welcomeSeen';
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
					className="welcome-screen"
				>
					<>
						<h1>Para-buch!</h1>
						<h3>Eksperymenty</h3>
					</>
					<img className="girl-gif" src={GirlGif} alt="" />
					<button
						className="centered"
						onClick={() => {
							// just for tests Cookies.set(COOKIENAME_SEEN, 'true', true);
							setClosed(true);
						}}>
						Start!
					</button>
					<><p>realizacja<br/><span className="immortal">immortal wombat</span></p></>
				</ModalBox>
		}
	</>;
};



export default Welcome;