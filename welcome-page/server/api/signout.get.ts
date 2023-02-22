export default defineEventHandler(async (event) => {
	const idCookie = getCookie(event, 'id')
	if (!idCookie) {
		return { message: 'Already signed out' }
	}
	setCookie(event, 'id', "", {
		maxAge: 0,
		path: '/',
		sameSite: 'lax',
		secure: true,
	})
	return { message: 'Signed out' }
})
