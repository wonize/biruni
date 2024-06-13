import { default as process } from 'node:process';
import { main } from 'bedo';
import build from '../../../scripts/release-helper';


main(async () => {
	await build('.');
});
