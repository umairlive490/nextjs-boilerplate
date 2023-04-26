import { Button, Grid, TextField, Typography } from '@mui/material';
import { validateEmail } from '@utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import lockIcon from '../assets/images/lock.svg';
import { ChevronLeft } from '@mui/icons-material';
import { Box } from '@mui/system';
import axios from 'axios';

const classes = {
	resetBtn: {
		height: '48px',
		background: '#95C8E4',
		borderRadius: 1,
		color: '#161C24',
		textTransform: 'capitalize',
		fontSize: '15px',
		fontWeight: 700
	}
};

function ResetPassword() {
	const router = useRouter();
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<boolean>(false);
	const handleResetCode = async () => {
		if (!validateEmail(email)) {
			setError(true);
			return;
		}

		try {
			await axios.post('/api/password/reset_code', { email });
			alert('Please check your email');
			router.push({
				pathname: '/reset',
				query: {
					email
				}
			});
		} catch (error) {
			alert('An error occurred');
			console.error(error);
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validateEmail(e.target.value)) {
			setError(false);
		}
		setEmail(e.target.value);
	};

	const handleBack = () => {
		router.push('/login');
	};

	const { resetBtn } = classes;

	return (
		<>
			<Grid container alignItems='center' justifyContent='center'>
				<Grid item xs={12} md={6} lg={4}>
					<Grid
						minHeight={'100vh'}
						container
						direction='column'
						justifyContent='center'
						alignItems='center'
						p={5}
						gap={3}
					>
						<Grid xs={12} item>
							<Image src={lockIcon} alt='lock' />
						</Grid>
						<Typography color={'#212B36'} fontWeight={700} variant='h4'>
							Forgot Password
						</Typography>
						<Typography fontSize={16} fontWeight={400} color={'#637381'}>
							Please enter the email address associated with your account, and we&apos;ll email you
							a link to reset your password.
						</Typography>
						<Grid xs={12} item width='100%'>
							<TextField
								onChange={handleChange}
								name='email'
								variant='outlined'
								placeholder='Email address'
								fullWidth
								error={error}
								helperText={error && 'Please enter valid email'}
							/>
						</Grid>
						<Button
							sx={resetBtn}
							onClick={handleResetCode}
							fullWidth
							variant='contained'
							disableElevation
						>
							Reset Password
						</Button>

						<Grid xs={12} item>
							<Box
								sx={{ cursor: 'pointer' }}
								onClick={handleBack}
								display={'flex'}
								fontSize={'14px'}
								color='#212B36'
							>
								<ChevronLeft />
								<Typography component='span'>Return to sign in</Typography>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default ResetPassword;
