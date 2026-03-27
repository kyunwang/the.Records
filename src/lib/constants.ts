const STORAGE_KEYS = {
	SPOTIFY_ACCESS_TOKEN: 'spotify_access_token',
	SPOTIFY_REFRESH_TOKEN: 'spotify_refresh_token',
	SPOTIFY_VERIFIER: 'spotify_verifier',
	SPOTIFY_AUTH_STATE: 'spotify_auth_state',
} as const;

export type LocalStorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export default STORAGE_KEYS;
