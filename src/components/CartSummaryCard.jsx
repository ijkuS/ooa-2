import React from 'react';

export default function CartSummaryCard({
	totalPrice,
	deliveryFee,
	cartItems,
}) {
	return (
		<>
			<div className='text__holder'>
				<p>Order Value: {totalPrice} USD</p>
				<p>Delievery: {deliveryFee} USD </p>

				<p className='total'>
					Total: {`${totalPrice + deliveryFee} USD`}
				</p>
			</div>
			<button>Proceed to Checkout</button>
		</>
	);
}
