export default defineEventHandler(async (event) => {
	const { id } = await readBody(event)
	if (!id) {
		return;
	}
	if (typeof id !== 'string') {
		return;
	}

	const { cfgDomain, pmaDomain } = useRuntimeConfig()

	let places = [
		{ name: " Editor ", value: `https://dev-${id}.${cfgDomain}/`, href: `https://dev-${id}.${cfgDomain}/` },
		{ name: " Web ", value: `https://${id}.${cfgDomain}/`, href: `https://${id}.${cfgDomain}/` },
		{ name: " Base de Datos ", value: `Usuario: cbtisL_${id} - Host: ${cfgDomain}`, href: `https://${pmaDomain}/phpmyadmin/` },
	]

	return places
})
