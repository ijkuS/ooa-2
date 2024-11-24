import { ref as databaseRef, get, remove, set } from 'firebase/database';
import { firebaseRTDatabase } from './config';

export async function getCart(userId) {
	const cartRef = databaseRef(firebaseRTDatabase, `carts/${userId}`);
	// console.log(cartRef);
	try {
		const snapshot = await get(cartRef);
		if (snapshot.exists()) {
			const items = snapshot.val();
			const modifiedItems = Object.values(items);
			// console.log('🍎🍎 modifiedItems:', modifiedItems);

			return modifiedItems;
		} else {
			console.log('No data available from getCart');
			return [];
		}
	} catch (error) {
		console.error('Error getting cart', error);
		return [];
	}
}

export async function addOrUpdateCart(userId, product) {
	const dbRef = databaseRef(
		firebaseRTDatabase,
		`carts/${userId}/${product.id}`
	);
	return set(dbRef, product);
}

export async function removeFromCart(userId, productId) {
	const dbRef = databaseRef(
		firebaseRTDatabase,
		`carts/${userId}/${productId}`
	);
	return remove(dbRef);
}
