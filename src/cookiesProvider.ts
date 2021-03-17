import Cookies = require('js-cookie');
const ALLOWED = 'cookiesAllowed';

const setCookie = (name: string, value: string, necessaryCookie, expires=365) => {
	if (necessaryCookie || Cookies.get(ALLOWED) === 'true') {
		Cookies.set(name, value, {expires: expires});
	}
};

const allowCookies = () => {
	Cookies.set(ALLOWED, 'true', {expires: 365});
};



const CookiesProvider = {
	get: Cookies.get,
	set: setCookie,
	allow: allowCookies
};

export default CookiesProvider;

