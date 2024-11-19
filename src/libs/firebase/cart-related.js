import { ref as databaseRef, get, remove, set } from 'firebase/database';
import { firebaseRTDatabase, firebaseStorage } from './config';
import { ref } from 'firebase/storage';

export async function getCart(userId) {
	const dbRef = databaseRef(firebaseRTDatabase, `carts/${userId}`);
	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const items = snapshot.val();
			console.log(items);
		}
		return {}; // []으로 해야하나...? without snapshot,
	} catch (error) {
		console.error('Error getting cart', error);
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
