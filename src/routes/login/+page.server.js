import { PRIVATE_CONTROL_PASSWORD } from '$env/static/private';

export async function load({ cookies }) {}

export const actions = {
	/**
	 *
	 * @param {*} event
	 */
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const password = data.get('password');

		if (password === PRIVATE_CONTROL_PASSWORD) {
			cookies.set('control', 'true', {
				path: '/',
				maxAge: 60 * 60 * 24 * 365 * 10
			});
			return {
				status: 200,
				body: {
					success: true
				}
			};
		} else {
			return {
				status: 200,
				body: {
					success: false
				}
			};
		}
	}
};
