import React, { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, List, ListItemButton, Typography } from '@mui/material';
import { ServicesDrawerProp, ServiceTab } from '@/types';
import Image from 'next/image';
import { servicesDetailItems } from '@/constants';

const classes = {
	tabsContainer: (showNavIconsOnly: boolean) => ({
		'& .MuiListItemButton-root.Mui-selected': {
			backgroundColor: '#00AB5514',
			'&:hover': {
				backgroundColor: '#00AB5514'
			},
			'& .MuiTypography-root': {
				color: 'secondary.main',
				ml: 2
			}
		},

		'& .MuiTypography-root': {
			ml: 2
		},
		'& .MuiListItemButton-root': {
			justifyContent: showNavIconsOnly ? 'center' : 'flex-start',
			borderRadius: '8px',
			'&:hover': {
				borderRadius: '8px'
			}
		}
	})
};

export const ServicesNavigationTabs: FunctionComponent<ServicesDrawerProp> = ({
	isDrawerOpen,
	showNavIconsOnly
}) => {
	const router = useRouter();

	const [selectedTab, setSelectedTab] = useState<string>(router.pathname);

	const handleRouteChange = (path: string) => {
		const id: string | string[] | undefined = router.query._id;
		if (id) {
			const pathName = path.replace('[_id]', id.toString());
			router.push(pathName);
		}
	};

	useEffect(() => {
		setSelectedTab(router.pathname);
	}, [router, router.pathname]);

	return (
		<Grid container alignItems='center'>
			<Grid item xs={12}>
				<List role='tab-section' sx={classes.tabsContainer(showNavIconsOnly)}>
					{servicesDetailItems.map((item: ServiceTab) => {
						const selected = selectedTab === item.pathName;
						return (
							<ListItemButton
								key={item.id}
								onClick={() => handleRouteChange(item.pathName)}
								selected={selected}
							>
								<Image
									src={selected ? item.selectedIcon : item.unselectedIcon}
									alt='dashboard-icon'
								/>
								{!showNavIconsOnly && (
									<Typography sx={{ display: !isDrawerOpen ? 'none' : 'block' }}>
										{item.title}
									</Typography>
								)}
							</ListItemButton>
						);
					})}
				</List>
			</Grid>
		</Grid>
	);
};
