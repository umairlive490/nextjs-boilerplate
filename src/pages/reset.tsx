import {
	Button,
	Grid,
	Hidden,
	InputAdornment,
	TextField,
	IconButton,
	Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import loginBackground from '../assets/images/login-background.png';
import axios from 'axios';
import lockIcon from '../assets/images/lock.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';

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

function ResetPassword() {
	const router = useRouter();
	const { email } = router.query;
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPasswordPassword] = useState('');
	const [code, setCode] = useState('');

	const handleResetPassword = async () => {
		if (password !== confirmPassword) {
			alert('Password does not match');
			return;
		}
		try {
			await axios.post('/api/password/reset', {
				email,
				password,
				code
			});
			router.push('/');
		} catch (error) {
			alert('An error occurred');
			console.error(error);
		}
	};
	const { resetBtn } = classes;

	return (
		<>
			<Grid container>
				<Grid item position={'relative'} xs={12} sm={8}>
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
					<Grid
						minHeight={'100vh'}
						container
						direction='column'
						justifyContent='center'
						alignItems='center'
						p={5}
						gap={2}
					>
						<Grid xs={12} item>
							<Image src={lockIcon} alt='lock' />
						</Grid>
						<Typography color={'#212B36'} fontWeight={700} variant='h4'>
							Set New Password
						</Typography>
						<Typography fontSize={16} fontWeight={400} color={'#637381'}>
							Enter your new password to login.
						</Typography>
						<Grid item xs={12} width='100%'>
							<StyledTextField
								name='code'
								value={code}
								onChange={(e) => setCode(e.target.value)}
								label='Verification code'
								variant='outlined'
								inputProps={{ maxLength: 6 }}
							/>
						</Grid>

						<Grid xs={12} item width='100%'>
							<StyledTextField
								name='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type={showPassword ? 'text' : 'password'}
								label='Password'
								variant='outlined'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={() => setShowPassword(!showPassword)}
												edge='end'
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid xs={12} item width='100%'>
							<StyledTextField
								name='confirmPassword'
								value={confirmPassword}
								onChange={(e) => setConfirmPasswordPassword(e.target.value)}
								type={showConfirmPassword ? 'text' : 'password'}
								label='Confirm Password'
								variant='outlined'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												edge='end'
											>
												{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</Grid>
						<Grid item width={'100%'}>
							<Button
								sx={resetBtn}
								onClick={handleResetPassword}
								fullWidth
								variant='contained'
								disableElevation
								disabled={!code.length || !password.length || !confirmPassword.length}
							>
								Update Password
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default ResetPassword;
