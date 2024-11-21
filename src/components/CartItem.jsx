import { addOrUpdateCart, removeFromCart } from '@/libs/firebase/cart-related';
import Link from 'next/link';
import React from 'react';
import {
	AiOutlineMinusCircle,
	AiOutlinePlusCircle,
	AiOutlineClose,
} from 'react-icons/ai';

export default function CartItem({ cartItem, uid }) {
	// console.log('🛒🛒', cartItem, uid);
	const { images, title, price, category, id, quantity, options } = cartItem;
	const handleMinus = () => {
		addOrUpdateCart(uid, { ...cartItem, quantity: quantity - 1 });
		console.log('-1');
	};
	const handlePlus = () => {
		addOrUpdateCart(uid, { ...cartItem, quantity: quantity + 1 });
		console.log('+1');
	};
	const handleDelete = () => {
		removeFromCart(uid, id);
		console.log('clicked remove from Cart');
	};

	return (
		<>
			<div className='image__holder'>
				<img src={images[0]} alt={title} />
			</div>
			<div className='text__holder'>
				<p className='product-title'>{title}</p>
				<p className='category'>{category}</p>
				<p className='option-selected'>Size: {options}</p>

				<div className='quantity__holder'>
					<button className='btn-minus' onClick={handleMinus}>
						<AiOutlineMinusCircle />
					</button>
					<p>{quantity}</p>
					<button className='btn-plus' onClick={handlePlus}>
						<AiOutlinePlusCircle />
					</button>
				</div>
				<p className='price'>{`${price} USD`}</p>
			</div>
			<button className='btn-delete' onClick={handleDelete}>
				<AiOutlineClose />
			</button>
		</>
	);
}
