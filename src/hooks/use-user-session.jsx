'use client';

import { createSession, removeSession } from '@/actions/auth-actions';
import {
	onUserStateChange,
	login as firebaseLogin,
	logout as firebaseLogout,
} from '@/libs/firebase/auth';
import React, { useEffect, useState } from 'react';

export default function useUserSession() {
	const [user, setUser] = useState(null);
	const [role, setRole] = useState('visitor');

	// Handle login, update session and role
	const login = async () => {
		try {
			const loggedInUser = await firebaseLogin();
			const userRole = loggedInUser.isAdmin ? 'admin' : 'member'; // Determine role based on isAdmin property
			await createSession(loggedInUser, loggedInUser.uid, userRole);
			setUser(loggedInUser);
			setRole(userRole);
		} catch (error) {
			console.error('Error during login:', error);
		}
	};
	const logout = async () => {
		try {
			await firebaseLogout();
			await removeSession();
			setUser(null);
			setRole('visitor');
			console.log('Logged out successfully');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	useEffect(() => {
		onUserStateChange((authUser) => {
			if (authUser) {
				const newRole = authUser.isAdmin ? 'admin' : 'member';
				setUser(authUser);
				setRole(newRole);
				// console.log('🍎🍎 this is AuthUser', authUser);
				console.log('🍏🍏 this is newRole', newRole);
			} else {
				setUser(null);
				setRole('visitor');
				console.log('User logged out');
			}
		});
	}, []);
	// console.log('this is 2nd check:', user, user && user.uid, role);
	// console.log(user, `Your role: ${role}. this is from use-user-session`);
	return { user, uid: user?.uid || null, role, login, logout };
}
