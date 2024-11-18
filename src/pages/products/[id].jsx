import { useRouter } from 'next/router';
import React from 'react';

export default function ProductDetail() {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div>
			<h2>ProductDetail : {id}</h2>
			{/* <h2>ProductDetail Page</h2> */}
		</div>
	);
}
