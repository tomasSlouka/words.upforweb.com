
export default {
	srcDir: __dirname,
	buildDir: 'apps/words/.nuxt/words',
	generate: {
		dir: 'apps/words/generate',
	},
	/*
	** Nuxt rendering mode
	** See https://nuxtjs.org/api/configuration-mode
	*/
	ssr: true,
	/*
	** Nuxt target
	** See https://nuxtjs.org/api/configuration-target
	*/
	target: 'server',
	/*
	** Headers of the page
	** See https://nuxtjs.org/api/configuration-head
	*/
	head: {
		title: 'Words',
		htmlAttrs: {
			lang: 'sk'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
			{ hid: 'title', name: "title", content: "Words." },
			{ hid: 'description', name: "description", content: "Words - personal dictionary" },
			{ hid: 'og-type', property: "og:type", content: "website" },
			{ hid: 'og-url', property: "og:url", content: "https://words.upforweb.com/" },
			{ hid: 'og-title', property: "og:title", content: "Words." },
			{ hid: 'og-description', property: "og:description", content: "Words - personal dictionary" },
		],
		link: [

		],
		script: [

		],
	},
	/*
	** Global CSS
	*/
	css: [
		"~assets/css/global.css",
		"~assets/css/_system/flex.css",
		"~assets/css/_system/grid.css",
		"~assets/css/_system/webbase.css",
		"~assets/css/_system/animations.css",
	],
	loading: { color: '#ffd401', height: '2px', width: '100%' },
	pageTransition: {
		name: 'layout',
		mode: 'out-in'
	},
	/*
	** Plugins to load before mounting the App
	** https://nuxtjs.org/guide/plugins
	*/
	plugins: [
		{ src: "~/plugins/disablelogs.js" }, // works only in production
		{ src: '~/plugins/axios.js' },
		{ src: '~/plugins/lodash.js' },
	],
	/*
	** Auto import components
	** See https://nuxtjs.org/api/configuration-components
	*/
	components: true,
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/axios',
	],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {},
	/*
	** Build configuration
	** See https://nuxtjs.org/api/configuration-build/
	*/
	build: {
	}
}
