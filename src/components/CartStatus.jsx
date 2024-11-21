import { getCart } from '@/libs/firebase/cart-related';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { IoBagOutline } from 'react-icons/io5';

export default function CartStatus({ user }) {
	const uid = user.uid;
	const {
		isPending,
		isError,
		data: cartItems,
	} = useQuery({
		queryKey: ['carts', uid],
		queryFn: async () => {
			const data = await getCart(uid);
			return data;
		},
	});

	return (
		<div className='cart-icon'>
			{isPending && <p>Loading...</p>}
			{isError && <p>There is something wrong...</p>}
			{cartItems && <p className='cart-badge'>{cartItems.length}</p>}
			<IoBagOutline />
		</div>
	);
}
