export default defineEventHandler(async (event) => {
	const { id } = await readBody(event)
	if (!id) {
		return;
	}
	if (typeof id !== 'string') {
		return;
	}
	setCookie(event, 'id', id, {
		maxAge: 60 * 60 * 24 * 7,
		path: '/',
		sameSite: 'lax',
		secure: true,
	})
})
