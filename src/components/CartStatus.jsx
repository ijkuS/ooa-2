import useCart from '@/hooks/useCart';

import React from 'react';
import { IoBagOutline } from 'react-icons/io5';

export default function CartStatus() {
	const { isPending, isError, cartItems } = useCart();

	// const {
	// 	isPending,
	// 	isError,
	// 	data: cartItems,
	// } = useQuery({
	// 	queryKey: ['carts', uid],
	// 	queryFn: async () => {
	// 		const data = await getCart(uid);
	// 		return data;
	// 	},
	// });

	return (
		<div className='cart-icon'>
			{isPending && <p>Loading...</p>}
			{isError && <p>There is something wrong...</p>}
			{cartItems && console.log(cartItems.length)}
			{cartItems && <p className='cart-badge'>{cartItems.length}</p>}
			<IoBagOutline />
		</div>
	);
}
