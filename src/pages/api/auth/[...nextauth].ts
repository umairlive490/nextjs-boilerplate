import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CognitoService } from '@/utils/cognito';
// import { JwtCallbackProps } from '@types';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'username_password',
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Username' },
				password: { label: 'Password', type: 'password', placeholder: 'Password' }
			},
			async authorize(credentials) {
				try {
					const cognito = new CognitoService();
					const response = await cognito.login(
						credentials?.username || '',
						credentials?.password || ''
					);

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					return response as any; // TODO: this should return a user object instead of a response object
				} catch (err) {
					return null;
				}
			}
		})
	],
	pages: {
		signIn: '/login'
	},
	// callbacks: {
	// 	async jwt(props: JwtCallbackProps) {
	// 		return props.token;
	// 	}
	// },
	theme: {
		colorScheme: 'light'
	}
};

export default NextAuth(authOptions);
