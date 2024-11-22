import { ref as databaseRef, get, remove, set } from 'firebase/database';

import { firebaseRTDatabase, firebaseStorage } from './config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function uploadFiles(files) {
	try {
		const uploadPromises = Array.from(files).map(async (file) => {
			const fileRef = ref(
				firebaseStorage,
				`product-images/${file.name}`
			);
			return uploadBytes(fileRef, file).then((snapshot) => {
				console.log(snapshot);
				return getDownloadURL(snapshot.ref);
			});
		});
		const urls = await Promise.all(uploadPromises);
		console.log(urls);
		return urls;
	} catch (error) {
		console.error('Error uploading files:', error);
	}
}

export async function addNewProduct(product, imageUrls) {
	const id = `ooa-${Date.now()}-${Math.floor(Math.random() * 100)}`;
	const dbRef = databaseRef(firebaseRTDatabase, `products/${id}`);
	try {
		set(dbRef, {
			...product,
			id,
			price: product.price,
			images: Array.isArray(imageUrls) ? imageUrls : [imageUrls],
			options: product.options.split(','),
		});
	} catch (error) {
		console.error('Error adding new product:', error);
	}
}

export async function getProducts() {
	const dbRef = databaseRef(firebaseRTDatabase, 'products');

	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return []; // snapshot이 없다면 텅텅빈 배열 리턴해줘
	} catch (error) {
		console.error('Error getting products', error);
	}
}

export async function removeProduct(productId) {
	const dbRef = databaseRef(firebaseRTDatabase, `products/${productId}`);
	return remove(dbRef);
}
