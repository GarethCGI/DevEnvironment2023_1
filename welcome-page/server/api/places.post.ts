export default defineEventHandler(async (event) => {
	const id = await getCookie(event, 'id')
	if (!id) {
		return;
	}
	if (typeof id !== 'string') {
		return;
	}

	const { cfgDomain, pmaDomain } = useRuntimeConfig()


	let places = [
		{ name: " Editor ", value: `https://dev-${id}.${cfgDomain}/`, href: `https://dev-${id}.${cfgDomain}/`, bootable: true },
		{ name: " Web ", value: `https://${id}.${cfgDomain}/`, href: `https://${id}.${cfgDomain}/`, bootable: false },
		{ name: " Base de Datos ", value: `Usuario: cbtisL_${id} - Host: ${pmaDomain}`, href: `https://${pmaDomain}/phpmyadmin/`, bootable: false },
	]

	return places
})
