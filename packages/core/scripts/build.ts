import { main } from 'bedo';
import build from '../../../scripts/release-helper';

main(async () => {
	await build('.');
});
