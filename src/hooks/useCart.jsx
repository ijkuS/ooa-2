import {
	addOrUpdateCart,
	getCart,
	removeFromCart,
} from '@/libs/firebase/cart-related';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useUserSession from './use-user-session';

export default function useCart() {
	const { uid } = useUserSession();
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		data: cartItems,
	} = useQuery({
		queryKey: ['carts', uid || ''],
		queryFn: async () => await getCart(uid),
		enabled: !!uid, // only fetc if uid exists
	});

	const addOrUpdateCartMutation = useMutation({
		mutationFn: ({ userId, product }) => {
			addOrUpdateCart(userId, product);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['carts'],
			});
		},
	});
	const removeFromCartMutation = useMutation({
		mutationFn: ({ userId, productId }) =>
			removeFromCart(userId, productId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['carts'] });
		},
	});

	return {
		cartItems,
		isError,
		isPending,
		addOrUpdateCartMutation,
		removeFromCartMutation,
	};
}
