import React, { FunctionComponent } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { AppBarOptionsProps, HeaderItemProps } from '@/types';

export const AppBarOptionsMenu: FunctionComponent<AppBarOptionsProps> = ({
	anchor,
	onClose,
	logout,
	options
}) => {
	return (
		<Menu role='menu' open={!!anchor} anchorEl={anchor} onClose={onClose}>
			{options.map((item: HeaderItemProps, index: number) => {
				return (
					<MenuItem role='menu-item' key={`menu-item-${index}`}>
						<Typography color='primary'>{item.name}</Typography>
					</MenuItem>
				);
			})}
			<MenuItem role='logout-btn-event' onClick={logout}>
				<Typography role='logout-text' color='primary'>
					Logout
				</Typography>
			</MenuItem>
		</Menu>
	);
};
