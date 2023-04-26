import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import ConfigureUserRoutes from '@/api/controllers/user.controller';
import ConfigureAccountRoutes from '@/api/controllers/account.controller';

let router = nc<NextApiRequest, NextApiResponse>();

router = ConfigureUserRoutes(router);
router = ConfigureAccountRoutes(router);

/* This will run if none of the above matches */
router.all((req: NextApiRequest, res: NextApiResponse) => {
	res.status(405).json({
		error: 'Method not allowed'
	});
});

export default router;
