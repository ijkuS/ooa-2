import Navbar from '@/app/components/Navbar';
import React from 'react';

export default function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Navbar />
			<Component {...pageProps} />
		</div>
	);
}
