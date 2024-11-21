import React from 'react';
import '@/app/globals.css';
import '@/app/styles/style-addnew.css';
import '@/app/styles/style-product-detail.css';
import '@/app/styles/style-all-products.css';
import '@/app/styles/style-cart.css';

import Navbar from '@/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function MyApp({ Component, pageProps }) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<main className='main-wrapper'>
				<Navbar />
				<Component {...pageProps} />
			</main>
		</QueryClientProvider>
	);
}
