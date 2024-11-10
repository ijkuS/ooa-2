'use client';

import {
	onUserStateChange,
	googleLogin,
	googleLogout,
} from '@/libs/firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext({
	session: {},
	isMember: false,
	isLoading: false,
});

export default function authProvider({ children }) {
	const [session, setSession] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const isMember = !!session && !!session?.access_token;
	// const isAdmin = !!session && !!session?.acces_token
	const storage = useLocalStorage();

	useEffect(() => {
		try {
			const sessionStorage = storage.getItem('session');
			setIsLoading(true);
			if (sessionStorage.access_token) {
				setSession(sessionStorage);
				return;
			}
			setSession({});
		} catch (error) {
			setSession({});
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	}, [storage]);
	return (
		<AuthContext.Provider value={{ session, isMember, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}
export const useAuthContext = () => useContext(AuthContext);
