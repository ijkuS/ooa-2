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
	const cartQuery = useQuery({
		queryKey: ['carts', uid || ''],
		queryFn: async () => await getCart(uid),
		enabled: !!uid, // only fetc if uid exists
		staleTime: 0, // consider all data stale immediately
		cacheTime: 1000 * 60 * 5, // cache for 5 min
	});

	// const addOrUpdateCartMutation = useMutation({
	// 	mutationFn: ({ userId, product }) => addOrUpdateCart(userId, product),
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({
	// 			queryKey: ['carts'],
	// 		});
	// 	},
	// });
	const addOrUpdateCartMutation = useMutation({
		mutationFn: ({ userId, product }) => {
			addOrUpdateCart(userId, product);
		},
		onMutate: async ({ product }) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: ['carts', uid] });

			// Snapshot the previous value
			const previousCart = queryClient.getQueryData(['carts', uid]);

			// Optimistically update the cart
			queryClient.setQueryData(['carts', uid], (old = []) => {
				const existingItemIndex = old.findIndex(
					(item) => item.id === product.id
				);
				if (existingItemIndex > -1) {
					return old.map((item) =>
						item.id === product.id ? product : item
					);
				}
				return [...old, product];
			});

			return { previousCart };
		},
		onError: (error, variables, context) => {
			if (context?.previousCart) {
				queryClient.setQueryData(
					['carts', uid],
					context.previousCart
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['carts', uid] });
		},
		// onSuccess: () => {
		// 	queryClient.invalidateQueries({
		// 		queryKey: ['carts'],
		// 	});
		// },
	});
	const removeFromCartMutation = useMutation({
		mutationFn: ({ userId, productId }) =>
			removeFromCart(userId, productId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['carts'] });
		},
	});

	return {
		cartItems: cartQuery.data,
		isError: cartQuery.isError,
		isPending: cartQuery.isPending,
		// cartItems,
		// isError,
		// isPending,
		addOrUpdateCartMutation,
		removeFromCartMutation,
	};
}
