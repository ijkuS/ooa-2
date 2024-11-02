import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '../libs/firebase/config';

export function useUserSession(initSession) {
	const [userId, setUserId] = useState(initSession);

	//listen for changes to the user session
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			firebaseAuth,
			async (authUser) => {
				if (authUser) {
					setUserId(authUser.uid);
				} else {
					setUserId(null);
				}
			}
		);
		return () => unsubscribe();
	}, []);
	return userId;
}
