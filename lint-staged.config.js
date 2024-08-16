export default {
	'*': [
		// prettier (only staged files)
		'node_modules/.bin/nr format:fix:only',
		// eslint (only staged files)
		'node_modules/.bin/nr lint:fix:only',
	],
};
