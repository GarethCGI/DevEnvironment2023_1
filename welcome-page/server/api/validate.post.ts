export default defineEventHandler(async (event) => {
	const { id } = await readBody(event)
	if (!id) {
		return { isValid: false }
	}
	if (typeof id !== 'string') {
		return { isValid: false }
	}
	const { cfgDomain } = useRuntimeConfig()
	// Request and check if status code is 200
	const response = await fetch(`https://dev-${id}.${cfgDomain}/`).catch(() => {
		return { status: 404 }
	})
	if (response.status === 200) {
		return { isValid: true }
	} else {
		return { isValid: false }
	}
})
