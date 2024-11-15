import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/libs/firebase/product-related';
import React, { useEffect, useState } from 'react';

export default function AllProductsPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getProducts()
			.then((data) => {
				console.log(data);
				setProducts(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching products:', error);
				setError(error);
				setLoading(false);
			});
	}, []);
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error loading products</div>;
	}

	return (
		<section className='all-products__page-container'>
			<h2 className='page-title'>All Products</h2>
			<div className='sub-wrapper'>
				{products && (
					<ul className='product-list'>
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
						{/* {products.map((product) => (
							<div>{product.title}</div>
						))} */}
					</ul>
				)}
			</div>
		</section>
	);
}
