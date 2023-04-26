import { createTheme } from '@mui/material/styles';

export default createTheme({
	typography: {
		h3: {
			fontFamily: 'Barlow',
			color: '#212B36',
			fontSize: '32px',
			fontWeight: '700',
			lineHeight: '48px'
		},
		h4: {
			fontFamily: 'Barlow',
			color: '#212B36',
			fontSize: '24px',
			fontWeight: '700',
			lineHeight: '36px'
		},
		body1: {
			fontFamily: 'Public Sans',
			color: '#212B36',
			fontSize: '16px',
			fontWeight: '400',
			lineHeight: '24px'
		},
		button: {
			fontFamily: 'Public Sans',
			color: '#212B36',
			textTransform: 'none'
		}
	}
});
