import { AppBarLayout } from '@layout';
import { Grid } from '@mui/material';
import { ReactElement } from 'react';

const Customer = () => {
	return (
		<Grid container>
			<Grid
				item
				xs={12}
				sx={{
					justifyContent: 'center',
					display: 'flex',
					background: '#e1e1e1',
					height: 'calc(100vh - 64px)',
					alignItems: 'center',
					fontSize: '24px',
					fontWeight: 700
				}}
			>
				welcome to customer screen
			</Grid>
		</Grid>
	);
};

Customer.getLayout = function getLayout(page: ReactElement) {
	return <AppBarLayout>{page}</AppBarLayout>;
};

export default Customer;
