import React from 'react';

export default function CartItem({ CartItem }) {
	const { id, image, title, price, category, quantity } = CartItem;
	return (
		<div className='cart-item__wrapper'>
			<div className='image__holder'></div>
			<div className='text__holder'>
				<p className='product-title'>{title}</p>
				<p className='category'>{category}</p>
				<p className='price'>{`${price} USD`}</p>
				<div className='quantity__holder'>
					<button className='btn-minus'>-</button>
					<p>{quantity}</p>
					<button className='btn-plus'>+</button>
					<button className='btn-delete'>&times;</button>
				</div>
			</div>
		</div>
	);
}
