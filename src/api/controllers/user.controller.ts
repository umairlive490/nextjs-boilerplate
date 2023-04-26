import type { NextApiRequest, NextApiResponse } from 'next';
import { NextConnect } from 'next-connect';
import { authGuard, AuthNextApiRequest, AuthNextApiHandler } from '@/api/middleware';

const me: AuthNextApiHandler = (req: AuthNextApiRequest, res: NextApiResponse) => {
	res.json({
		session: req.session,
		user: 'self'
	});
};

function configureRoutes(router: NextConnect<NextApiRequest, NextApiResponse>) {
	router.get('/api/me', authGuard(me));

	return router;
}

export default configureRoutes;
