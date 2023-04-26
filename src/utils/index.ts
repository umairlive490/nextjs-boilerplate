import { NextRouter } from 'next/router';

export const validateEmail = (email: string): boolean => {
	//eslint-disable-next-line
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	}

	return false;
};
export { default as CognitoService } from './cognito';

export const getRootTab = (router: NextRouter) => {
	const routeElements = router.pathname.split('/');
	return `/${routeElements[1]}`;
};
