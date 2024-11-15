import Banner from '@/components/Banner';
import AllProductsPage from './products/all';

export default function Home() {
	return (
		<section className='all-products__page-container'>
			<Banner />
			<AllProductsPage />
		</section>
	);
}