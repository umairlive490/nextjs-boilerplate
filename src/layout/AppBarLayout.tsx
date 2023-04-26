import React, { FunctionComponent, ReactNode, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Grid, AppBar, Toolbar, Drawer, Box, IconButton, Typography } from '@mui/material';
import { RootNavigationTabs } from '../components';
import Logo from '../assets/images/Logo.svg';
import Notification from '../assets/images/notification_icon.svg';
import { signOut } from 'next-auth/react';

type LayoutProps = {
	children: ReactNode;
};

type DrawerState = {
	nav: boolean;
	context: boolean;
	feedback: boolean;
};

type ClassProps = {
	isDrawerOpen: boolean;
	isSecondaryDrawerOpen: boolean;
	pathname: string;
};

const classes = ({ isDrawerOpen, isSecondaryDrawerOpen }: ClassProps) => ({
	root: {
		width: '100%',
		minHeight: '100vh',
		transition: 'ease-in-out 500ms'
	},
	drawerContent: {
		width: 280,
		minHeight: '100%',
		backgroundColor: '#F9FAFB',
		transition: 'ease-in-out 300ms'
	},
	drawerSecondaryContent: {
		width: 400,
		minHeight: '100%',
		transition: 'ease-in-out 300ms'
	},
	appbar: {
		width: '100%',
		transition: 'ease-in-out 300ms',
		borderBottom: '1px solid #eef0f3',
		'.MuiToolbar-root': {
			height: 64
		},
		background: '#121726',
		color: '#fff'
	},
	drawerPaper: {
		marginTop: '64px',
		borderRight: '1px solid #eef0f3'
	},
	drawerSecondaryPaper: {
		top: 64,
		height: 'calc(100% - 64px)',
		borderLeft: '1px solid #eef0f3'
	},
	container: {
		top: 64,
		right: 0,
		left: 280,
		bottom: 0,
		overflowY: 'auto',
		position: 'fixed',
		transition: 'ease-in-out 300ms'
	},
	expandDrawerBtn: {
		position: 'absolute',
		top: '50%',
		left: 260,
		transition: 'ease-in-out 300ms',
		zIndex: 1201,
		'& img': {
			transition: 'ease-in-out 200ms',
			transform: isDrawerOpen ? 'rotate(180deg)' : 'unset'
		}
	},
	expandSecondaryDrawerBtn: {
		top: '50%',
		position: 'absolute',
		right: 380,
		transition: 'ease-in-out 300ms',
		zIndex: 1201,
		'& img': {
			transition: 'ease-in-out 200ms',
			transform: isSecondaryDrawerOpen ? 'unset' : 'rotate(180deg)'
		}
	},
	controls: {
		gap: 0,
		padding: '0 16px',
		alignItems: 'center'
	},
	avatar: {
		'&:hover': {
			cursor: 'pointer'
		}
	},
	navText: {
		color: '#919EAB',
		fontWeight: 400,
		fontSize: '14px',
		fontFamily: 'Public Sans'
	}
});

export const AppBarLayout: FunctionComponent<LayoutProps> = ({ children }) => {
	const router = useRouter();

	const [isDrawerOpen] = useState<DrawerState>({
		nav: true,
		context: false,
		feedback: false
	});

	const styles = classes({
		isDrawerOpen: isDrawerOpen.nav,
		isSecondaryDrawerOpen: isDrawerOpen.feedback,
		pathname: router.pathname
	});

	const handleSignOut = () => {
		signOut({ redirect: true, callbackUrl: '/' })
			.then((data: unknown) => {
				console.log('🚀 ~ file: AppBarLayout.tsx:129 ~ .then ~ data:', data);
			})
			.catch((error: unknown) => {
				console.log(error);
			});
	};

	return (
		<Grid container sx={styles.root}>
			<Grid item xs={12}>
				<AppBar color='secondary' sx={styles.appbar} elevation={0}>
					<Toolbar disableGutters>
						<Grid container sx={styles.controls} justifyContent='flex-end'>
							<IconButton size='medium' edge='start' color='inherit' aria-label='open drawer'>
								<Image
									src={Logo}
									alt='whisk-logo'
									style={{ height: '24px', width: '24px' }}
								></Image>
							</IconButton>
							<Typography color='#ffffff' fontSize='18px'>
								Whisk Media
							</Typography>
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<IconButton size='large' aria-label='show 4 new mails' color='inherit'>
									<Image alt='Customer-icon' src={Notification} />
								</IconButton>
								<IconButton size='large' aria-label='show 4 new mails' color='inherit'>
									<Typography sx={styles.navText}>Users</Typography>
								</IconButton>
								<IconButton size='large' aria-label='show 4 new mails' color='inherit'>
									<Typography sx={styles.navText}>Profile</Typography>
								</IconButton>
								<IconButton
									onClick={handleSignOut}
									size='large'
									aria-label='show 4 new mails'
									color='inherit'
								>
									<Typography sx={styles.navText}>Log Out</Typography>
								</IconButton>
							</Box>
						</Grid>
					</Toolbar>
				</AppBar>
			</Grid>

			<Drawer open variant='persistent' PaperProps={{ sx: styles.drawerPaper }}>
				<Grid container p={2} sx={styles.drawerContent} flexDirection='column' rowGap={3}>
					<Grid item>
						<RootNavigationTabs isDrawerOpen={isDrawerOpen.nav} />
					</Grid>
				</Grid>
			</Drawer>
			<Box component='main' sx={styles.container}>
				{children}
			</Box>
		</Grid>
	);
};
