import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref } from 'firebase/database';

import { getAnalytics } from 'firebase/analytics';
// import { getStorage } from "firebase/storage";
import {
	GoogleAuthProvider,
	connectAuthEmulator,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

// https://DATABASE_NAME.firebaseio.com (for databases in us-central1)
// https://DATABASE_NAME.REGION.firebasedatabase.app (for databases in all other locations)
export const firebaseConfig = {
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
typeof window !== undefined;
const auth = getAuth(app);
const database = getDatabase(app);
//getAnalytics(app);
const provider = new GoogleAuthProvider();

connectAuthEmulator(auth, 'http://localhost:9099');
