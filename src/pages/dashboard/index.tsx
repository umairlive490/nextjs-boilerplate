import { AppBarLayout } from '@layout';
import { Grid } from '@mui/material';
import { ReactElement } from 'react';

const classes = {
	signIn: {
		justifyContent: 'center',
		display: 'flex',
		background: '#e1e1e1',
		height: 'calc(100vh - 64px)',
		alignItems: 'center',
		fontSize: '24px',
		fontWeight: 700
	}
};

const Dashboard = () => {
	return (
		<Grid container>
			<Grid item xs={12} sx={classes.signIn}>
				You are signed in to Whisk Media
			</Grid>
		</Grid>
	);
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <AppBarLayout>{page}</AppBarLayout>;
};

export default Dashboard;
