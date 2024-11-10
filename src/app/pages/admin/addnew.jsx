import { useAuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import loading from '../loading';

export default function AddNewPage() {
	const { user } = useAuthContext();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// check if the user data has loaded
		if (user !== undefined) {
			if (!user || !user.isAdmin) {
				router.replace('/');
			} else {
				setIsLoading(false); // allow the page to render if the user is an admin
			}
		}
	}, [user, router]);
	if (isLoading) {
		loading();
	}
	return (
		<div>
			<h2>Add New Page</h2>
		</div>
	);
}
