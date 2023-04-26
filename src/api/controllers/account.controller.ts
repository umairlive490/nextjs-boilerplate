import type { NextApiRequest, NextApiResponse } from 'next';
import { NextConnect } from 'next-connect';
import { AuthNextApiRequest } from '@/api/middleware';
import { CognitoService } from '@/utils/cognito';

const confirmSignupCode = async (req: AuthNextApiRequest, res: NextApiResponse) => {
	const { code, email } = req.body;

	const cognito = new CognitoService();

	const response = await cognito.confirmSignupCode(code, email);
	const httpStatusCode = response['$metadata'].httpStatusCode || 500;

	return res.status(httpStatusCode).send(response);
};

const resendSignupCode = async (req: AuthNextApiRequest, res: NextApiResponse) => {
	const { email } = req.body;

	const cognito = new CognitoService();

	const response = await cognito.resendSignupCode(email);
	const httpStatusCode = response['$metadata'].httpStatusCode || 500;

	return res.status(httpStatusCode).send(response);
};

const registerUser = async (req: AuthNextApiRequest, res: NextApiResponse) => {
	const { username, password } = req.body;

	const cognito = new CognitoService();

	const response = await cognito.signup(username, password, username);
	const httpStatusCode = response['$metadata'].httpStatusCode || 500;

	return res.status(httpStatusCode).send(response);
};

const passwordResetCodeRequest = async (req: AuthNextApiRequest, res: NextApiResponse) => {
	const { email } = req.body;

	const cognito = new CognitoService();

	const response = await cognito.resetPasswordCode(email);
	const httpStatusCode = response['$metadata'].httpStatusCode || 500;

	return res.status(httpStatusCode).send(response);
};
const passwordReset = async (req: AuthNextApiRequest, res: NextApiResponse) => {
	const { email, password, code } = req.body;

	const cognito = new CognitoService();

	const response = await cognito.passwordReset(code, password, email);
	const httpStatusCode = response['$metadata'].httpStatusCode || 500;

	return res.status(httpStatusCode).send(response);
};

function configureRoutes(router: NextConnect<NextApiRequest, NextApiResponse>) {
	router.post('/api/confirm', confirmSignupCode);
	router.post('/api/confirm/send', resendSignupCode);
	router.post('/api/register', registerUser);
	router.post('/api/password/reset', passwordReset);
	router.post('/api/password/reset_code', passwordResetCodeRequest);

	return router;
}

export default configureRoutes;
