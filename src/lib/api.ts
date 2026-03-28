import { getData } from './data';

export const getTopTracks = async () => {
	const data = await getData('/api/spotify/top/tracks');
	return data;
};
