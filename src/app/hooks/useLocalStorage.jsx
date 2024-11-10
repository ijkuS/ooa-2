'use client';

import secureLocalStorage from 'react-secure-storage';

export default function useLocalStorage() {
	const storage = secureLocalStorage;

	function setItem(key, value) {
		storage.setItem(key);
	}
	function getItem(key) {
		return storage.getItem(key);
	}
	function clear() {
		storage.clear();
	}
	return {
		getItem,
		setItem,
		clear,
	};
}
