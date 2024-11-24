import { addNewProduct, getProducts } from '@/libs/firebase/product-related';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useProducts() {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		data: products,
	} = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	});
	const addProductMutation = useMutation({
		mutationFn: async ({ product, urls }) => {
			return await addNewProduct(product, urls);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
		onError: (error) => {
			console.error('Error adding product: ', error);
		},
	});
	return {
		products,
		isError,
		isPending,
		addProductMutation,
	};
}
