import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
} from 'firebase/auth';
import { get, ref as databaseRef } from 'firebase/database';
import { firebaseAuth, firebaseRTDatabase } from './config';

export async function login() {
	const provider = new GoogleAuthProvider();

	try {
		const result = await signInWithPopup(firebaseAuth, provider);
		if (!result || !result.user) {
			throw new Error('Google sign in failed');
		}
		return result.user;
	} catch (error) {
		console.error('Error signing in with Google', error);
	}
}
export async function logout() {
	try {
		await firebaseAuth.signOut();
	} catch (error) {
		console.error('Error signing out with Google', error);
	}
}
export function onUserStateChange(callback) {
	const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
		const updatedUser = user ? await adminUser(user) : null;
		callback(updatedUser);
		console.log(updatedUser, 'this is updatedUser');
	});
	return unsubscribe;
}
export async function adminUser(user) {
	const dbRef = databaseRef(firebaseRTDatabase, 'admins');
	try {
		const snapshot = await get(dbRef);
		const isAdmin = snapshot.exists()
			? snapshot.val().includes(user.uid)
			: user.uid === process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID;
		// if (snapshot.exists()) {
		// 	const admins = snapshot.val();
		// 	const isAdmin = admins.includes(user.uid);
		// 	return { ...user, isAdmin };
		// }
		// if (user.uid === process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID) {
		// 	return { ...user, isAdmin };
		// }
		return { ...user, isAdmin };
	} catch (error) {
		console.log(error);
		return { ...user, isAdmin: false };
	}
}
