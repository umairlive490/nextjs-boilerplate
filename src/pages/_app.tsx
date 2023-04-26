import { ReactElement, ReactNode, createContext, useState } from 'react';
import theme from '@assets/theme';
import '@assets/styles/index.css';
// import { AppContext } from '@context';
import { ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import type { GlobalContext } from '@types';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
	const [globalContext, setGlobalContext] = useState<GlobalContext>({} as GlobalContext);
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider value={{ ...globalContext, setGlobalContext }}>
				<SessionProvider session={session}>
					{getLayout(<Component {...pageProps} />)}
				</SessionProvider>
			</AppContext.Provider>
		</ThemeProvider>
	);
};

export const AppContext = createContext({} as GlobalContext);
export default App;
