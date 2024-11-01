import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref } from 'firebase/database';

import { getAnalytics } from 'firebase/analytics';
// import { getStorage } from "firebase/storage";
import {
	GoogleAuthProvider,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

// https://DATABASE_NAME.firebaseio.com (for databases in us-central1)
// https://DATABASE_NAME.REGION.firebasedatabase.app (for databases in all other locations)
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const database = getDatabase(app);
//getAnalytics(app);
const provider = new GoogleAuthProvider();

export async function googleLogin() {
	return signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;
			return user;
		})
		.catch(console.error);
}
export async function googleLogout() {
	return signOut(auth)
		.then(() => null)
		.catch((error) => {
			console.log(error);
			return null; // Ensures consistent return
		});
}
export function OnUserStateChange(callback) {
	onAuthStateChanged(auth, async (user) => {
		// user && adminUser(user);
		const updatedUser = user ? await adminUser(user) : null;
		console.log(updatedUser, 'this is updatedUser');
		callback(updatedUser);
	});
}

export async function adminUser(user) {
	const dbRef = ref(database, 'admins');
	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const admins = snapshot.val();
			const isAdmin = admins.includes(user.uid);
			return { ...user, isAdmin };
		}
		return { ...user, isAdmin: false }; // Explicitly set `isAdmin: false` if no admins found
		// get(dbRef).then((snapshot) => {
		// 	if (snapshot.exists()) {
		// 		const admins = snapshot.val();
		// 		const isAdmin = admins.includes(user.uid);
		// 		return { ...user, isAdmin };
		// 	}
		// 	return user;
		// });
	} catch (error) {
		console.log(error);
		return { ...user, isAdmin: false }; // Return `isAdmin: false` on error
	}
}
