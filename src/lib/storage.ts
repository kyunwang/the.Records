import type { LocalStorageKey } from './constants';

const getLocalStorageItem = (key: LocalStorageKey): string | null => {
	if (typeof window === "undefined") {
		return null;
	}
	return localStorage.getItem(key);
}

const setLocalStorageItem = (key: LocalStorageKey, value: string): void => {
	if (typeof window === "undefined") {
		return;
	}
	localStorage.setItem(key, value);
}

const removeLocalStorageItem = (key: LocalStorageKey): void => {
	if (typeof window === "undefined") {
		return;
	}
	localStorage.removeItem(key);
}

export { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem };
