import type { Dispatch, ReactElement, ReactNode, SetStateAction, MouseEvent } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { JWT } from 'next-auth/jwt';
import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

/* Global */
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export type UserModel = {
	email: string;
	id: string;
	firstName: string;
	lastName: string;
	role: string;
	AccessToken?: string;
	ExpiresIn?: number;
	IdToken?: string;
	RefreshToken?: string;
	TokenType?: string;
};

export type GlobalContext = {
	userData: UserModel;
	setGlobalContext: Dispatch<SetStateAction<GlobalContext>>;
};

/* Server */
export type RegisterDto = {
	name: string;
	email: string;
	password: string;
};

export type LoginDto = {
	email: string;
	password: string;
};

export interface CognitoSessionResponse extends User {
	accessToken: string;
	refreshToken: string;
}

export type JwtCallbackProps = {
	token: JWT;
	user: User | AdapterUser;
	account: Account | null;
	profile?: Profile | undefined;
	trigger?: 'signIn' | 'signUp' | 'update' | undefined;
	isNewUser?: boolean | undefined;
	session?: unknown;
};

/* Client */
export type LoginInput = {
	username: string;
	password: string;
};

export type RegistrationInput = {
	username: string;
	password: string;
};

export type AppBarClassProps = {
	pathname: string;
};

export type HeaderItemProps = {
	[key: string]: unknown;
	name: string;
	unselectedIcon: string;
	selectedIcon: string;
};

export type MenuState = {
	isOpen: boolean;
	anchor?: Element;
};

export type LayoutProps = {
	children: ReactNode;
	items: HeaderItemProps[];
};

export type HelpingMenu = {
	isOpen: boolean;
	anchor?: Element;
};

export type AppBarOptionsProps = {
	anchor?: Element;
	onClose: (event: MouseEvent<Element>) => void;
	logout: () => void;
	options: HeaderItemProps[];
};

export type NavDrawerState = {
	nav: boolean;
	context: boolean;
	feedback: boolean;
};

export type NavBarClassProps = {
	isDrawerOpen: boolean;
	isSecondaryDrawerOpen: boolean;
	pathname: string;
	isAppBar: boolean;
	isLight: boolean;
	showNavIconsOnly: boolean;
};

export type DrawerState = {
	nav: boolean;
	context: boolean;
	feedback: boolean;
};

export type ServiceTab = {
	id: number;
	pathName: string;
	title: string;
	unselectedIcon: string;
	selectedIcon: string;
};

export type ServicesDrawerProp = {
	isDrawerOpen: boolean;
	showNavIconsOnly: boolean;
};

export type DrawerProp = {
	isDrawerOpen: boolean;
};

export type UnselectedBoxComponentProps = {
	children: ReactNode;
};

export type SelectedBoxComponentProps = {
	children: ReactNode;
};
