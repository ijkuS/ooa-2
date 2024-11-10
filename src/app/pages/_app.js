import Navbar from '@/app/components/Header';
import React from 'react';
import '@/app/globals.css';

export default function MyApp({ Component, pageProps }) {
	return (
		<main className='main-wrapper'>
			<Navbar />
			<Component {...pageProps} />
		</main>
	);
}
