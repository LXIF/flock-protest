import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	if (cookies.get('control') !== 'true') {
		redirect(307, '/login');
	}
}

export const actions = {
	logout: async ({ cookies }) => {
		cookies.set('control', 'false', {
			path: '/',
			maxAge: 60 * 60 * 24 * 365 * 10
		});
		redirect(307, '/login');
	}
};
