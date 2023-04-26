import React, { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Grid, List, ListItemButton, Typography } from '@mui/material';
import FacilityIcon from '../assets/images/facility_icon.svg';
import Dashboard from '../assets/images/dashboard_icon.svg';
import { getRootTab } from '../utils';

const classes = {
	tabsContainer: {
		'& .MuiListItemButton-root.Mui-selected': {
			backgroundColor: '#F4F4F4',
			'&:hover': {
				backgroundColor: '#F4F4F4'
			},
			'& .MuiTypography-root': {
				ml: 2,
				fontWeight: 600,
				fontSize: '14px',
				color: '#1395DC',
				fontFamily: 'Public Sans'
			}
		},

		'& .MuiTypography-root': {
			ml: 2
		},
		'& .MuiListItemButton-root': {
			borderRadius: '8px',
			'&:hover': {
				borderRadius: '8px',
				backgroundColor: '#EEE'
			}
		}
	},
	tabText: {
		ml: 2,
		fontWeight: 600,
		fontSize: '14px',
		color: '#637381',
		fontFamily: 'Public Sans'
	}
};

type DrawerProp = {
	isDrawerOpen: boolean;
};

export const RootNavigationTabs: FunctionComponent<DrawerProp> = () => {
	const router = useRouter();

	const [selectedTab, setSelectedTab] = useState<string>(getRootTab(router));

	const handleRouteChange = (path: string) => {
		router.push(path);
	};

	useEffect(() => {
		setSelectedTab(getRootTab(router));
	}, [router, router.pathname]);

	return (
		<Grid container alignItems='center'>
			<Grid item xs={12}>
				<List sx={classes.tabsContainer}>
					<ListItemButton
						onClick={() => handleRouteChange('/dashboard')}
						selected={selectedTab === '/dashboard'}
					>
						<Image alt='Customer-icon' src={selectedTab === '/dashboard' ? Dashboard : Dashboard} />
						<Typography sx={classes.tabText}>Dashboard</Typography>
					</ListItemButton>
					<ListItemButton
						onClick={() => handleRouteChange('/facilities')}
						selected={selectedTab === '/facilities'}
					>
						<Image
							alt='Customer-icon'
							src={selectedTab === '/facilities' ? FacilityIcon : FacilityIcon}
						/>
						<Typography sx={classes.tabText}>Facility</Typography>
					</ListItemButton>
				</List>
			</Grid>
		</Grid>
	);
};
