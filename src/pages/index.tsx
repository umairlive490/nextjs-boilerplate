import { Grid } from '@mui/material';
import Login from './login';

const Home = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Login />
			</Grid>
		</Grid>
	);
};

export default Home;
