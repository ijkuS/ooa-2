import Link from 'next/link';
import React from 'react';

export default function ProductCard({ product }) {
	const { images, title, price, category, id } = product; // Destructure within the component

	return (
		<Link href={`/products/${id}`} id={id}>
			<div className='product-card__container'>
				<div className='image__holder'>
					<img src={images[0]} alt={title} />
				</div>
				<div className='text__holder'>
					<p className='category'>{category}</p>
					<p className='product-title'>{title}</p>
					<p className='price'>{`${price} USD`}</p>
				</div>
			</div>
		</Link>
	);
}
