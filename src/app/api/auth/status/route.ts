import { NextRequest, NextResponse } from 'next/server';

import STORAGE_KEYS from '@/lib/constants';

export async function GET(req: NextRequest) {
	const hasAccessToken = req.cookies.has(STORAGE_KEYS.SPOTIFY_ACCESS_TOKEN);

	return NextResponse.json({ authenticated: hasAccessToken });
}
