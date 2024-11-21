import CartItem from '@/components/CartItem';
import useUserSession from '@/hooks/use-user-session';
import { getCart } from '@/libs/firebase/cart-related';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export default function CartPage() {
	const { user, uid } = useUserSession();
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

	// console.log('🔥 this is from CartPage', user, uid);

	// const [cartItems, setCartItems] = useState(null);
	// const [isLoading, setIsLoading] = useState(true);
	// const [isError, setIsError] = useState(false);

	// useEffect(() => {
	// 	if (!uid) return;
	// 	setIsLoading(true);
	// 	setIsError(false);
	// 	getCart(uid)
	// 		.then((data) => {
	// 			setCartItems(data); // update cart items
	// 		})
	// 		.catch(() => {
	// 			setIsError(true); // handle errors
	// 		})
	// 		.finally(() => {
	// 			setIsLoading(false); // reset loading state
	// 		});
	// }, [uid]); // re-run the effect if 'uid' changes

	return (
		<section className='cart__page-container'>
			<h2 className='page-title'>Your Bag</h2>
			{isPending && <p>Loading...</p>}
			{isError && <p>There is something wrong...</p>}
			{cartItems && (
				<ul>
					{cartItems.map((cartItem) => (
						<li key={cartItem.id}>
							<CartItem cartItem={cartItem} uid={uid} />
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
