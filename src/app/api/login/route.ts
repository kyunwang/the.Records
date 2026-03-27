import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

import STORAGE_KEYS from '@/lib/constants';
import { generateCodeVerifier, getSpotifyAuthUrl } from '@/lib/spotify-auth';

export async function GET(req: NextRequest) {
	const cookieStore = await cookies();
	const state = generateCodeVerifier(16);

	cookieStore.set(STORAGE_KEYS.SPOTIFY_AUTH_STATE, state, {
		httpOnly: true,
		// secure: true,
		// sameSite: 'lax',
	});

	const redirectUrl = getSpotifyAuthUrl(state);

	redirect(redirectUrl);
}
