import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import STORAGE_KEYS from '@/lib/constants';
import { getSpotifyAccessToken } from '@/lib/spotify-auth';

export async function GET(req: NextRequest) {
	const cookieStore = await cookies();
	const searchParams = req.nextUrl.searchParams;
	const code = searchParams.get('code');
	const state = searchParams.get('state');
	const error = searchParams.get('error');

	if (error) {
		redirect('/error?message=login_failed');
	}

	const storedState = cookieStore.get(STORAGE_KEYS.SPOTIFY_AUTH_STATE)?.value;

	if (!code) {
		redirect('/error?message=missing_code');
	}

	if (state === null || state !== storedState) {
		redirect('/error?message=state_mismatch');
	}

	try {
		// Get access token from Spotify
		const { accessToken, refreshToken } = await getSpotifyAccessToken(code);

		// Delete the state cookie after successful authentication
		cookieStore.delete(STORAGE_KEYS.SPOTIFY_AUTH_STATE);

		cookieStore.set(STORAGE_KEYS.SPOTIFY_ACCESS_TOKEN, accessToken, {
			httpOnly: true,
			// secure: true,
			// sameSite: 'lax',
		});

		if (refreshToken) {
			cookieStore.set(STORAGE_KEYS.SPOTIFY_REFRESH_TOKEN, refreshToken, {
				httpOnly: true,
				// secure: true,
				// sameSite: 'lax',
			});
		}

		// BASE_URL for local development (using vercel's portless), req.url for production since it's already absolute
		const baseUrl = process.env.NODE_ENV === 'development' ? process.env.BASE_URL : req.url;

		const redirectUrl = `${baseUrl}/tracks`;

		const response = NextResponse.redirect(redirectUrl);

		return response;
	} catch (err) {
		console.error('Error exchanging code for token:', err);
		redirect('/error?message=token_exchange_failed');
	}
}
