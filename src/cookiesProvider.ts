import Cookies = require('js-cookie');
const ALLOWED = 'cookiesAllowed';

const setCookie = (name: string, value: string) => {
	if (Cookies.get(ALLOWED) === 'true') {
		Cookies.set(name, value);
	}
};

const allowCookies = () => {
	Cookies.set(ALLOWED, 'true');
};



const CookiesProvider = {
	get: Cookies.get,
	set: setCookie,
	allow: allowCookies
};

export default CookiesProvider;

