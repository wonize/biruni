import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Al-Biruni Doc's",
	description: "Unified Storage",
	appearance: 'dark',
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'References', link: '/references/' }
		],

		sidebar: [
			{
				text: 'Introduction',
				link: '/intro/',
				collapsed: true,
				items: [
					{ text: 'Overview', link: '/intro/#overview' },
					{ text: 'Installing', link: '/intro/#installation' },
					{ text: 'Example', link: '/intro/#example' },
					{ text: 'Why Biruni', link: '/intro/#why-biruni' }
				],
			},
			{
				text: 'Usage',
				items: [
					{ text: 'Store Data', link: '/references/set' },
					{ text: 'Restore Data', link: '/references/get' }
				]
			},
			{
				"text": "Plugins",
				"items": [
					{ text: "React Utilities", link: '/references/react/' },
					{ text: "Zod Utilities", link: '/references/zod/' },
					{
						text: "Built-in Utilities", link: '/references/built-in/',
						collapsed: true,
						items: [
							{ text: 'json plugin', link: '/references/built-in/json' },
							{ text: 'localStorage plugin', link: '/references/built-in/localstorage' },
							{ text: 'sessionStorage plugin', link: '/references/built-in/sessionstorage' },
						]
					}
				]
			},
			{
				"text": "Extra",
				"items": [
					{ text: 'Typescript', link: '/intro/typescript' },
					{ text: 'Convantion', link: '/intro/convantion' }
				]
			}
		],

		editLink: {
			pattern: ({ filePath }) => {
				if (filePath.startsWith('packages/')) {
					return `https://github.com/wonize/biruni/edit/main/packages/${filePath}`
				} else {
					return `https://github.com/wonize/biruni/edit/main/apps/docs/${filePath}`
				}
			},
			text: 'Edit this page on GitHub'
		},

		socialLinks: [
			{
				icon: 'github', link: 'https://github.com/wonize/biruni'
			}
		]
	}
})
