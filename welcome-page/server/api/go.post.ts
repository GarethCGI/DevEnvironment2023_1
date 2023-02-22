import axios from "axios"

export default defineEventHandler(async (event) => {
	const data = await readBody(event)
	if (!data) {
		console.log("Host Invalido: " + data)
		return { online: false }
	}
	if (!data.id) {
		console.log("Host Invalido: " + data)
		return { online: false }
	}
	const id = data.id
	const { pteroDomain, pteroKey } = useRuntimeConfig()
	const response = await axios.post(`https://${pteroDomain}/api/client/servers/${id}/power`, {
		signal: 'start'
	}, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${pteroKey}`
		}
	}).catch(() => {
		return { status: 404, online: false }
	})
	if (response.status === 204) {
		return { online: true }
	}
	return { online: false }
})
