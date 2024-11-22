import ProductCard from '@/components/ProductCard';
import useProducts from '@/hooks/useProducts';
// import { getProducts } from '@/libs/firebase/product-related';
// import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function AllProductsPage() {
	const { products, isPending, isError } = useProducts();
	// const {
	// 	isPending,
	// 	isError,
	// 	data: products,
	// } = useQuery({
	// 	queryKey: ['products'],
	// 	queryFn: getProducts,
	// });

	return (
		<section className='all-products__page-container'>
			<h2 className='page-title'>All Products</h2>
			{isPending && <p>Loading...</p>}
			{isError && <p>Error loading products</p>}
			<div className='sub-wrapper'>
				{products && (
					<ul className='product-list'>
						{products.map((product) => (
							<li key={product.id}>
								<ProductCard product={product} />
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}
