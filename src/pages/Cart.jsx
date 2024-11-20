import CartItem from '@/components/CartItem';
import useUserSession from '@/hooks/use-user-session';
import React from 'react';

export default function CartPage() {
	const { user } = useUserSession();
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
		<section className='cart__page-container'>
			<h2 className='page-title'>Your Bag</h2>
			{isLoading && <p>Loading...</p>}
			{isError && <p>There is something wrong...</p>}
			{cartItems && (
				<ul>
					{cartItems.map(([id, cartItem]) => (
						<CartItem key={id} cartItem={{ ...cartItem }} />
					))}
				</ul>
			)}
		</section>
	);
}
