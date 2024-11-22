import { addNewProduct, getProducts } from '@/libs/firebase/product-related';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

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
		mutationFn: addNewProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
	return {
		products,
		isError,
		isPending,
		addProductMutation,
	};
}
