import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { firebaseAuth, firebaseDatabase } from './config';
import { get, ref } from 'firebase/database';

export async function googleLogin() {
	const provider = new GoogleAuthProvider();

	try {
		const result = await signInWithPopup(firebaseAuth, provider);
		if (!result || !result.user) {
			throw new Error('Google sign in failed');
		}
		return result.user.uid;
	} catch (error) {
		console.error('Error signing in with Google', error);
	}
}
export async function googleLogout() {
	return signOut(firebaseAuth)
		.then(() => null)
		.catch((error) => {
			console.log(error);
			return null; // Ensures consistent return
		});
}
export function OnUserStateChange(callback) {
	onAuthStateChanged(firebaseAuth, async (user) => {
		if (user) {
			//fetch admin status and token in parallel
			const [isAdmin, token] = await Promise.all([
				adminUser(user),
				memberUser(user),
			]);
			const updatedUser = { ...user, isAdmin, token };
			callback(updatedUser);
		} else {
			callback(null);
		}
	});
}

export async function adminUser(user) {
	const dbRef = ref(firebaseDatabase, 'admins');
	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const admins = snapshot.val();
			const isAdmin = admins.includes(user.uid);
			return { ...user, isAdmin };
		}
		return { ...user, isAdmin: false }; // Explicitly set `isAdmin: false` if no admins found
	} catch (error) {
		console.log(error);
		return { ...user, isAdmin: false }; // Return `isAdmin: false` on error
	}
}
// export async function bringToken(user) {
// 	// idToken comes from the client app
// 	try {
// 		const idToken = await user.getIdToken();
// 		// console.log(idToken);
// 		return idToken;
// 	} catch (error) {
// 		console.log(error);
// 		return null;
// 	}
// }
export async function memberUser(user) {
	const idToken = await user.getIdToken();
	if (idToken) {
		console.log('you are our member');
		return true;
	} else {
		return false;
	}
}
