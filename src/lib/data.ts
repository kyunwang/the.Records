export async function getData(path: string, { revalidateSeconds = 60 } = {}) {
	const url = path;

	const res = await fetch(url, {
		next: { revalidate: revalidateSeconds },
	});

	if (!res.ok) {
		const txt = await res.text().catch(() => '');

		const err = new Error(`Fetch ${url} failed: ${res.status} ${res.statusText} ${txt}`);
		(err as any).status = res.status;

		throw err;
	}

	return res.json();
}
