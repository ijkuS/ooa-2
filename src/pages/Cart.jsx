import CartItem from '@/components/CartItem';
import CartSummaryCard from '@/components/CartSummaryCard';
import { GENERAL_DELIVERY_FEE } from '@/constants/shop-constants';
import useUserSession from '@/hooks/use-user-session';
import useCart from '@/hooks/useCart';

import React from 'react';

export default function CartPage() {
	const { uid } = useUserSession();
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

	const hasCartItems = cartItems && cartItems.length > 0;
	const cartItemPrice =
		cartItems &&
		cartItems.reduce(
			(prev, current) =>
				prev + parseInt(current.price) * current.quantity,
			0
		);

	return (
		<section className='cart__page-container'>
			<div className='item__container'>
				<h2 className='page-title'>Shopping Bag Items</h2>

				{isPending && <p className='alert-info'>Loading...</p>}
				{isError && (
					<p className='alert-info'>
						There is something wrong...
					</p>
				)}
				{!hasCartItems && (
					<p className='alert-info'>Shopping bag is empty now</p>
				)}
				{hasCartItems && (
					<ul>
						{cartItems.map((cartItem) => (
							<li
								key={cartItem.id}
								className='cart-item__container'>
								<CartItem
									cartItem={cartItem}
									uid={uid}
								/>
							</li>
						))}
					</ul>
				)}
			</div>
			{cartItems && (
				<div className='cart-summary-card__container'>
					<h2 className='page-title'>Order Summary</h2>

					<CartSummaryCard
						totalPrice={cartItemPrice}
						deliveryFee={GENERAL_DELIVERY_FEE}
						cartItems={cartItems}
					/>
				</div>
			)}
		</section>
	);
}
