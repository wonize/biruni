export default {
	'*': [
		// eslint (only staged files)
		'node_modules/.bin/nr lint:fix:only',
		// prettier (only staged files)
		'node_modules/.bin/nr format:fix:only',
	],
};
