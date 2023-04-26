import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export interface AuthNextApiRequest extends NextApiRequest {
	session: Session;
}

export declare type AuthNextApiHandler<T = unknown> = (
	req: AuthNextApiRequest,
	res: NextApiResponse<T>
) => unknown | Promise<unknown>;

export const authGuard =
	(handler: AuthNextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
		const session = await getServerSession(req, res, authOptions);
		if (session) {
			req = {
				...req,
				session
			} as AuthNextApiRequest;
			return handler(req as AuthNextApiRequest, res);
		} else {
			throw new Error('Unauthorized');
		}
	};
