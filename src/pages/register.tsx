import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { RegistrationInput } from '@types';
import {
	Button,
	Grid,
	Hidden,
	IconButton,
	InputAdornment,
	TextField,
	Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import loginBackground from '../assets/images/login-background.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
		fontFamily: 'Public Sans'
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

const Register: NextPage = () => {
	const [signupInput, setSignupInput] = useState({} as RegistrationInput);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const router = useRouter();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setSignupInput({ ...signupInput, [name]: value });
	};

	const handleRegisterClick = async () => {
		try {
			await axios.post('/api/register', signupInput);
			alert('An verification email has been sent to you');
			router.push(`confirm/${signupInput.username}`);
		} catch (error) {
			alert('An error occurred');
			console.error(error);
		}
	};

	return (
		<Grid container alignItems='center' justifyContent='center' sx={{ minHeight: '100vh' }}>
			<Grid item xs={12} sm={4}>
				<Grid container sx={classes.signInContainer}>
					<Typography variant='h4'>Register User</Typography>
					<Grid item pt={4}>
						<StyledTextField
							name='username'
							value={signupInput.username}
							onChange={handleInputChange}
							label='Email address'
							variant='outlined'
						/>
					</Grid>
					<Grid item pt={2}>
						<StyledTextField
							name='password'
							value={signupInput.password}
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
					<Grid item pt={2}>
						<Button variant='contained' sx={classes.loginButton} onClick={handleRegisterClick}>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Register;
