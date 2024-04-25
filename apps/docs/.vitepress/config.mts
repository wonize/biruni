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
				items: [
					{ text: 'Installing', link: '/intro/install' },
					{ text: 'Why Biruni', link: '/intro/why-biruni' }
				],
			},
			{
				text: 'Usage',
				items: [
					{ text: 'Store Data', link: '/references/set' },
					{ text: 'Restore Data', link: '/references/get' }
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
