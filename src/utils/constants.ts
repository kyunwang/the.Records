const LOCALSTORAGE = {
    SPOTIFY_ACCESS_TOKEN: "spotify_access_token",
    SPOTIFY_REFRESH_TOKEN: "spotify_refresh_token",
	SPOTIFY_VERIFIER: "spotify_verifier"
} as const;

export type LocalStorageKey = typeof LOCALSTORAGE[keyof typeof LOCALSTORAGE];

export default LOCALSTORAGE;