import { getCart } from '@/libs/firebase/cart-related';
import React, { useEffect, useState } from 'react';
import { IoBagOutline } from 'react-icons/io5';

export default function CartStatus({ user }) {
	//console.log('this is from CartStatus', user); // received well
	const uid = user.uid;
	const [cartItems, setCartItems] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!uid) return;
		setIsLoading(true);
		setIsError(false);
		getCart(uid)
			.then((data) => {
				setCartItems(data); // update cart items
			})
			.catch(() => {
				setIsError(true); // handle errors
			})
			.finally(() => {
				setIsLoading(false); // reset loading state
			});
	}, [uid]); // re-run the effect if 'uid' changes

	return (
		<div className='cart-icon'>
			{isLoading && <p>Loading...</p>}
			{isError && <p>There is something wrong...</p>}
			{cartItems && <p className='cart-badge'>{cartItems.length}</p>}
			<IoBagOutline />
		</div>
	);
}
