import { useState, ChangeEvent } from 'react';
import { Button, Grid, Hidden, TextField, Typography } from '@mui/material'
import { NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import loginBackground from '../../assets/images/login-background.png';
import styled from '@emotion/styled';

const classes = {
	signInContainer: {
		padding: '0px 64px',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	loginButton: {
		padding: '11px 0px 11px 0px',
		width: '100%',
		color: '#161C24',
		fontSize: '15px',
		fontWeight: '700',
		lineHeight: '26px',
		borderRadius: '8px',
		backgroundColor: '#95C8E4',
		'&:hover': {
			background: '#95C8E4'
		}
	},

};

const StyledTextField = styled(TextField)({
	width: '100%',
	'& label.Mui-focused': {
		color: '#919EAB'
	},
	'& .MuiInputLabel-root': {
		color: '#919EAB'
	},
	'& .MuiInputBase-input': {
		padding: '16px 14px'
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#919EAB'
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			border: '1px solid #919EAB',
			borderRadius: '8px',
			height: '56px'
		},
		'&:hover fieldset': {
			borderColor: '#919EAB'
		},
		'&.Mui-focused fieldset': {
			borderColor: '#919EAB',
			border: '1px solid #919EAB'
		}
	}
});

const Confirm: NextPage = () => {
	const [confirmationCode, setConfirmationCode] = useState<string>('');

	const router = useRouter();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { value } = event.target;
		setConfirmationCode(value);
	};

	const handleVerifyClick = async () => {
		const payload = {
			code: confirmationCode,
			email: router.query.email
		};

		axios.post('/api/confirm', payload).then(() => {
			router.push('/login');
		});
	};

	if (!router.query.email) return <Typography>Loading...</Typography>;
	return (
		<Grid container sx={{ minHeight: '100vh' }}>
			<Grid item xs={8} sx={{ position: 'relative' }}>
				<Grid container>
					<Hidden smDown>
						<Grid
							item
							xs={12}
							sx={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								right: 0,
								left: 0,
								backgroundImage: `url(${loginBackground.src})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover'
							}}
						></Grid>
					</Hidden>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Grid container sx={classes.signInContainer}>
					<Typography variant='h4'>Enter Verification Code</Typography>
					<Grid item pt={2}>
						<StyledTextField
							name='username'
							disabled
							label='Email'
							variant='outlined'
							value={router.query.email}
						/>
					</Grid>
					<Grid item pt={2}>
						<StyledTextField
							name='confirmationCode'
							value={confirmationCode}
							onChange={handleInputChange}
							label='Verification code'
							variant='outlined'
							inputProps={{ maxLength: 6 }}
						/>
					</Grid>
					<Grid item pt={2}>
						<Button variant='contained' sx={classes.loginButton} onClick={handleVerifyClick}> Submit </Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Confirm;
