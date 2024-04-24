import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Al-Biruni Doc's",
	description: "Unified Storage",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' }
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' },
					{ text: '<.set> API', link: '/guides/set' },
					{ text: '<.get> API', link: '/guides/get' },
					{ text: '<.sync> API', link: '/guides/sync' }
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		]
	}
})
