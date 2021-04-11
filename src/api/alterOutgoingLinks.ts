const alterOutgoingLinks = (htmlString:string) => {
	if (!htmlString) return '';
	return htmlString.split('<a').join('<a target="_blank" ');
};

export default alterOutgoingLinks;