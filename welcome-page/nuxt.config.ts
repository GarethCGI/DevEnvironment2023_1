// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			brand: 'Nuxt.js',
			logoURL: '/logo.png',
			helpURL: 'https://nuxtjs.org/support-nuxtjs'
		},
		allowedHosts: ['localhost'],
		cfgDomain: 'localhost',
		pmaDomain: 'localhost',
		pteroDomain: 'localhost',
		pteroKey: 'put your key here',
	}
})
