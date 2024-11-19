import React from 'react';
import '@/app/globals.css';
import '@/app/styles/style-addnew.css';
import '@/app/styles/style-product-detail.css';
import '@/app/styles/style-all-products.css';
import Navbar from '@/components/Header';

export default function MyApp({ Component, pageProps }) {
	return (
		<main className='main-wrapper'>
			<Navbar />
			<Component {...pageProps} />
		</main>
	);
}
