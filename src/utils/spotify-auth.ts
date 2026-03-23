import queryString from 'query-string';
import LOCALSTORAGE from './constants';
import { getLocalStorageItem, setLocalStorageItem } from './storage';

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

export async function redirectToAuthCodeFlow() {
	const scope = "user-read-private user-read-email user-top-read";
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

	setLocalStorageItem(LOCALSTORAGE.SPOTIFY_VERIFIER, verifier);

    const params = new URLSearchParams({
		client_id: CLIENT_ID,
		response_type: "code",
		redirect_uri: REDIRECT_URI,
		scope: scope,
		code_challenge_method: "S256",
		code_challenge: challenge
	});

    document.location = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

export async function getRefreshToken() {
   const refreshToken = getLocalStorageItem(LOCALSTORAGE.SPOTIFY_REFRESH_TOKEN);

   const params = queryString.stringify({
	 grant_type: 'refresh_token',
	 refresh_token: refreshToken,
	 client_id: CLIENT_ID
   });

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params,
    }

    const body = await fetch(SPOTIFY_TOKEN_URL, payload);
    const response = await body.json();

    setLocalStorageItem(LOCALSTORAGE.SPOTIFY_ACCESS_TOKEN, response.access_token);

    if (response.refresh_token) {
      setLocalStorageItem(LOCALSTORAGE.SPOTIFY_REFRESH_TOKEN, response.refresh_token);
    }
  }

export async function getAccessToken(clientId: string, code: string) {
    const verifier = getLocalStorageItem(LOCALSTORAGE.SPOTIFY_VERIFIER);

    const params = new URLSearchParams({
		client_id: CLIENT_ID,
		grant_type: "authorization_code",
		code: code,
		redirect_uri: REDIRECT_URI,
		code_verifier: verifier!
	});

    const result = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
	
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}