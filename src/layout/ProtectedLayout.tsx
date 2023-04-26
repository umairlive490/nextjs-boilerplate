import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Logo from '@/assets/images/Lock.svg';
import { AUTH_ROUTES } from '@/constants';

const classes = {
	pageRoot: {
		minHeight: '100vh',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F9FAFB',
		flexDirection: 'column'
	},
	logoContainer: {
		justifyContent: 'center',
		width: '100%'
	}
};

export function ProtectedLayout({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	console.log('🚀 ~ file: ProtectedLayout.tsx:25 ~ ProtectedLayout ~ status:', status);
	console.log('🚀 ~ file: ProtectedLayout.tsx:25 ~ ProtectedLayout ~ session:', session);
	const router = useRouter();

	if (status === 'loading') {
		return (
			<Grid container sx={classes.pageRoot}>
				<Image src={Logo} alt='logo' height={100} width={100} />
				<Typography variant='body2' color='secondary'>
					Loading...
				</Typography>
			</Grid>
		);
	}

	// If session exists, display content
	if (status === 'authenticated' && AUTH_ROUTES.includes(router.pathname)) {
		router.push('/applications');
		return (
			<Grid container sx={classes.pageRoot}>
				<Image src={Logo} alt='logo' height={100} width={100} />
				<Typography variant='body2' color='secondary'>
					Authenticated...
				</Typography>
			</Grid>
		);
	} else if (status === 'authenticated') {
		return <>{children}</>;
	} else if (status === 'unauthenticated' && AUTH_ROUTES.includes(router.pathname)) {
		return <>{children}</>;
	} else if (status === 'unauthenticated' && !AUTH_ROUTES.includes(router.pathname)) {
		router.push('/login');
		return (
			<Grid container sx={classes.pageRoot}>
				<Image src={Logo} alt='logo' height={100} width={100} />
				<Typography variant='body2' color='secondary'>
					Un-Authenticated...
				</Typography>
			</Grid>
		);
	} else {
		return (
			<Grid container sx={classes.pageRoot}>
				<Image src={Logo} alt='logo' height={100} width={100} />
				<Typography variant='body2' color='secondary'>
					Un-Authenticated...
				</Typography>
			</Grid>
		);
	}
}
