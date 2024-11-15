import React from 'react';

export default function ProductCard({
	product: { images, title, price, category },
}) {
	return (
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
	);
}
