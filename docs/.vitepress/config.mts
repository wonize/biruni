import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: '/biruni/',
	title: "Al-Biruni Doc's",
	description: 'Unified All-in-One Storage Utilities',
	appearance: 'dark',

	srcDir: 'src',
	cleanUrls: true,
	sitemap: {
		hostname: 'https://wonize.github.com/biruni/',
	},

	themeConfig: {
		logo: {
			src: '/assets/logo.svg',
			dark: '/assets/logo-light.svg',
			light: '/assets/logo-dark.svg',
		},

		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Plugins', link: '/plugin/' },
			{ text: 'References', link: '/references/' },
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
					{ text: 'Features', link: '/intro/#features' },
					{ text: 'Under the Hood', link: '/intro/how-it-work' },
				],
			},
			{
				text: 'Usage',
				items: [
					{ text: 'Initialize Data', link: '/references/init' },
					{ text: 'Store Data', link: '/references/set' },
					{ text: 'Restore Data', link: '/references/get' },
					{ text: 'Listen Actions', link: '/references/listener' },
				],
			},
			{
				text: 'Plugins',
				link: '/plugin/',
				items: [
					{ text: 'React Utilities', link: '/plugin/react/' },
					{ text: 'Zod Utilities', link: '/plugin/zod/' },
					{ text: 'Extra Utilities', link: '/plugin/utility/' },
					{
						text: 'Built-in Utilities',
						link: '/plugin/built-in/',
						collapsed: true,
						items: [
							{ text: 'json plugin', link: '/plugin/built-in/json' },
							{ text: 'event plugin', link: '/plugin/built-in/event' },
							{ text: 'localStorage plugin', link: '/plugin/built-in/localstorage' },
						],
					},
				],
			},
			// {
			// 	text: 'Extra',
			// 	items: [
			// 		{ text: 'Typescript', link: '/intro/typescript' },
			// 		{ text: 'Convantion', link: '/intro/convantion' },
			// 	],
			// },
		],

		editLink: {
			pattern: ({ filePath }) => {
				if (filePath.startsWith('packages/')) {
					return `https://github.com/wonize/biruni/edit/main/packages/${filePath}`;
				} else {
					return `https://github.com/wonize/biruni/edit/main/apps/docs/${filePath}`;
				}
			},
			text: 'Edit this page on GitHub',
		},

		footer: {
			// @ts-ignore
			license: {
				text: 'GPLv3-only License',
				link: 'https://opensource.org/licenses/GPLv3-only',
			},
			message: 'Released under the GPLv3-only License',
			copyright: `Copyright © 2024-${(() => {
				const y = new Date().getFullYear();
				return y === 2024 ? 'present' : y;
			})()} Wonize Group`,
		},

		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/wonize/biruni',
			},
		],
	},

	head: [
		['link', { rel: 'icon', href: '/biruni/assets/logo.svg' }],
		['meta', { name: 'theme-color', content: '#6B1D1D' }],
		['meta', { property: 'og:url', content: 'https://wonize.github.io/biruni/' }],
		['meta', { property: 'og:type', content: 'website' }],
		['meta', { property: 'og:title', content: "Al-Biruni Doc's" }],
		[
			'meta',
			{
				property: 'og:description',
				content: 'Al-Biruni | The Unified All-in-One Storage Utilties',
			},
		],
		[
			'meta',
			{
				property: 'og:image',
				content: 'https://wonize.github.io/biruni/assets/og-image/light.png',
			},
		],
		['meta', { name: 'twitter:site', content: '@wonize' }],
		['meta', { name: 'twitter:card', content: 'summary' }],
	],
});
