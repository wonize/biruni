import { DataFlow } from '@/flow';

describe('DataFlow enum', () => {
	const flow = expectTypeOf(DataFlow);

	it('should have <INPUT> member', () => {
		flow.toHaveProperty('INPUT').toBeString();
		expect(DataFlow.INPUT).toStrictEqual('INPUT');
	});

	it('should have <INPUT> member', () => {
		flow.toHaveProperty('OUTPUT').toBeString();
		expect(DataFlow.OUTPUT).toStrictEqual('OUTPUT');
	});

	it('should have <NONE> member', () => {
		flow.toHaveProperty('NONE').toBeString();
		expect(DataFlow.NONE).toStrictEqual('NONE');
	});
});
