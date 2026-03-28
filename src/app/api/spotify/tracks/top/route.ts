import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const accessToken = req.cookies.get('spotify_access_token')?.value;

	if (!accessToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const response = await fetch(
			'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch top tracks');
		}

		const data = await response.json();
		return NextResponse.json(data?.items, { status: 200 });
	} catch (err) {
		console.error('Error fetching top tracks...', err);
		return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: 500 });
	}
}
