import Link from 'next/link';
import React from 'react';

export default function CartItem({ cartItem, uid }) {
	// console.log('🛒🛒', cartItem, uid);
	const { images, title, price, category, id, quantity } = cartItem;
	return (
		<>
			<div className='image__holder'>
				<img src={images[0]} alt={title} />
			</div>
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
		</>
		// <div className='cart-item__wrapper'>
		// 	<div className='image__holder'>
		// 		<img src={images} alt='' />
		// 	</div>
		// 	<div className='text__holder'>
		// 		<p className='product-title'>{title}</p>
		// 		<p className='category'>{category}</p>
		// 		<p className='price'>{`${price} USD`}</p>
		// 		<div className='quantity__holder'>
		// 			<button className='btn-minus'>-</button>
		// 			<p>{quantity}</p>
		// 			<button className='btn-plus'>+</button>
		// 			<button className='btn-delete'>&times;</button>
		// 		</div>
		// 	</div>
		// </div>
	);
}
