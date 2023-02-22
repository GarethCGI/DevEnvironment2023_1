export default defineEventHandler(async (event) => {
	const idCookie = getCookie(event, 'id')
	if (idCookie) {
		return { id: idCookie }
	}
	return { id: null }
})
