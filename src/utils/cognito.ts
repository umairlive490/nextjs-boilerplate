import {
	CognitoIdentityProviderClient,
	InitiateAuthCommand,
	ConfirmSignUpCommand,
	SignUpCommand,
	ResendConfirmationCodeCommand,
	ConfirmForgotPasswordCommand,
	ForgotPasswordCommand,
	AuthFlowType
} from '@aws-sdk/client-cognito-identity-provider';

export class CognitoService {
	service: CognitoIdentityProviderClient;
	appClientId: string;
	userPoolId: string;
	constructor() {
		const {
			COGNITO_REGION,
			COGNITO_APP_CLIENT_ID,
			COGNITO_USER_POOL_ID,
			AWS_ACCESS_KEY_ID,
			AWS_SECRET_ACCESS_KEY
		} = process.env;
		this.service = new CognitoIdentityProviderClient({
			region: COGNITO_REGION,
			credentials: {
				accessKeyId: AWS_ACCESS_KEY_ID || '',
				secretAccessKey: AWS_SECRET_ACCESS_KEY || ''
			}
		});
		this.appClientId = COGNITO_APP_CLIENT_ID as string;
		this.userPoolId = COGNITO_USER_POOL_ID as string;
	}

	login(username: string, password: string) {
		const params = {
			AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
			ClientId: this.appClientId,
			UserPoolId: this.userPoolId,
			AuthParameters: {
				USERNAME: username,
				PASSWORD: password
			}
		};
		const initiateAuthCommand = new InitiateAuthCommand(params);
		return this.service.send(initiateAuthCommand);
	}

	confirmSignupCode(ConfirmationCode: string, Username: string) {
		const params = {
			ClientId: this.appClientId,
			ConfirmationCode,
			Username
		};

		const confirmSignUpCommand = new ConfirmSignUpCommand(params);

		return this.service.send(confirmSignUpCommand);
	}

	resendSignupCode(Username: string) {
		const params = {
			ClientId: this.appClientId,
			Username
		};

		const confirmSignUpCommand = new ResendConfirmationCodeCommand(params);

		return this.service.send(confirmSignUpCommand);
	}

	signup(Username: string, Password: string, email: string) {
		const params = {
			ClientId: this.appClientId,
			Password,
			Username,
			UserAttributes: [
				{
					Name: 'email',
					Value: email
				}
			]
		};

		const signUpCommand = new SignUpCommand(params);
		return this.service.send(signUpCommand);
	}

	passwordReset(ConfirmationCode: string, Password: string, Username: string) {
		const params = {
			ClientId: this.appClientId,
			ConfirmationCode,
			Password,
			Username
		};

		const confirmForgotPasswordCommand = new ConfirmForgotPasswordCommand(params);
		return this.service.send(confirmForgotPasswordCommand);
	}

	resetPasswordCode(Username: string) {
		const params = {
			ClientId: this.appClientId,
			Username
		};
		const forgotPasswordCommand = new ForgotPasswordCommand(params);
		return this.service.send(forgotPasswordCommand);
	}
}

export default CognitoService;
