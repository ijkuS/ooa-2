'use client';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const publicPages = ['/', '/products/:path*'];

export default function protectedRoute({ children }) {
	const { isMember, isLoading } = useAuthContext();
	const route = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (isMember || isLoading || publicPages.includes(pathname)) return;

		route.replace('/');
		toast.error('User not authorized!');
	}, [isMember, isLoading, pathname, route]);

	if (isLoading) {
		return (
			<div>
				<center>
					<span>Loading...</span>
				</center>
			</div>
		);
	}
	if (isMember || publicPages.includes(pathname)) {
		return children;
	}
	return null;
	// if(!user || )

	// const auth = getAuth();
	// return new Promise((resolve, reject) => {
	// 	onAuthStateChanged(
	// 		auth,
	// 		(user) => {
	// 			if (user) {
	// 				resolve({ props: { user: JSON.stringify(user) } });
	// 			} else {
	// 				resolve({
	// 					redirect: {
	// 						destination: '/',
	// 						permanent: false,
	// 					},
	// 				});
	// 			}
	// 		},
	// 		reject
	// 	);
	// });
}
