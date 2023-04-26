import React, { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';
import {
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	Link,
	Button,
	Box
} from '@mui/material';
import googleIcon from '../assets/images/google-icon.svg';
import microsoftIcon from '../assets/images/microsoft-icon.svg';
import { signIn } from 'next-auth/react';
import { LoginInput } from '@types';
import { useRouter } from 'next/router';

const classes = {
	signInContainer: {
		padding: '0px 64px',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	forgetPassword: {
		fontSize: '14px',
		lineHeight: '22px',
		color: '#212B36',
		textDecorationColor: '#212B36',
		fontFamily: 'Public Sans',
		cursor: 'pointer'
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
	loginWithButton: {
		paddingX: '11px 0px 11px 0px',
		width: '100%',
		fontSize: '15px',
		fontWeight: '700',
		lineHeight: '26px',
		borderRadius: '8px',
		border: '1px solid #919EAB52',
		color: '#212B36',
		'&:hover': {
			border: '1px solid #919EAB52'
		}
	},
	dividerText: {
		color: '#919EAB',
		fontSize: '12px',
		fontWeight: '700',
		lineHeight: '18px',
		fontFamily: 'Public Sans',
		textAlign: 'center'
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
const Login: NextPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loginInput, setLoginInput] = useState({} as LoginInput);
	const router = useRouter();
	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setLoginInput({ ...loginInput, [name]: value });
	};

	const handleLoginClick = async () => {
		const { username, password } = loginInput;

		try {
			const data = await signIn('username_password', { username, password, redirect: false });
			if (data?.status !== 200) throw new Error('An error occured');
			// alert('Sign in successful');
			router.push('/dashboard');
		} catch (error) {
			alert(error);
			console.error(error);
		}
	};

	return (
		<Grid container alignItems='center' justifyContent='center' sx={{ minHeight: '100vh' }}>
			<Grid item xs={12} sm={4}>
				<Grid container sx={classes.signInContainer}>
					<Typography variant='h4'>Sign in</Typography>
					<Grid item pt={4}>
						<StyledTextField
							name='username'
							value={loginInput.username}
							onChange={handleInputChange}
							label='Email address'
							variant='outlined'
						/>
					</Grid>
					<Grid item pt={2}>
						<StyledTextField
							name='password'
							value={loginInput.password}
							onChange={handleInputChange}
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
					<Grid item pt={2} sx={{ textAlign: 'end' }}>
						<Link
							onClick={() => {
								router.push('/forgot');
							}}
							sx={classes.forgetPassword}
						>
							Forgot password?
						</Link>
					</Grid>
					<Grid item pt={2}>
						<Button variant='contained' sx={classes.loginButton} onClick={handleLoginClick}>
							Login
						</Button>
					</Grid>
					<Grid item pt='30px'>
						<Box sx={{ float: 'left', width: '44%' }}>
							<hr style={{ border: '1px dashed rgba(145, 158, 171, 0.24)' }} />
						</Box>
						<Box sx={{ float: 'right', width: '44%' }}>
							<hr style={{ border: '1px dashed rgba(145, 158, 171, 0.24)' }} />
						</Box>
						<Box sx={classes.dividerText}>OR</Box>
					</Grid>
					<Grid item pt='30px'>
						<Button
							variant='outlined'
							sx={classes.loginWithButton}
							startIcon={<Image src={googleIcon} alt='googleIcon' />}
						>
							Continue With Google
						</Button>
					</Grid>
					<Grid item pt={1}>
						<Button
							variant='outlined'
							sx={classes.loginWithButton}
							startIcon={<Image src={microsoftIcon} alt='microsoftIcon' />}
						>
							Continue With Microsoft
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default Login;
