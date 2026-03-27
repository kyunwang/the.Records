import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';

import Page from '../src/app/page';

test('renders the page component', () => {
	render(<Page />);

	const main = within(screen.getByRole('main'));

	const heading = main.getByRole('heading', { level: 1, name: /the\.records/i });
	expect(heading).toBeDefined();

	const loginButton = main.getByRole('link', { name: /login with spotify/i });
	expect(loginButton).toBeDefined();
});
