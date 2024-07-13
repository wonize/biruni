import type { MockData } from '@repo/mocks';
import { Store, type StoreInterface } from '@/store';

describe.todo('core/store.ts', () => {
	it('should be same signature with interface', () => {
		expectTypeOf<Store<MockData>>().toMatchTypeOf<StoreInterface<MockData>>();
	});

	describe('Getter Methods', () => {
		it('should have <get> method', () => {
			expect(Store.prototype).toHaveProperty('get');
			expectTypeOf(Store.prototype).toHaveProperty('get');
		});

		it('should have <getByKey> method', () => {
			expect(Store.prototype).toHaveProperty('getByKey');
			expectTypeOf(Store.prototype).toHaveProperty('getByKey');
		});

		it('should have <getByKeyMapper> method', () => {
			expect(Store.prototype).toHaveProperty('getByKeyMapper');
			expectTypeOf(Store.prototype).toHaveProperty('getByKeyMapper');
		});

		it('should have <getByEntire> method', () => {
			expect(Store.prototype).toHaveProperty('getByEntire');
			expectTypeOf(Store.prototype).toHaveProperty('getByEntire');
		});

		it('should have <getByMapper> method', () => {
			expect(Store.prototype).toHaveProperty('getByMapper');
			expectTypeOf(Store.prototype).toHaveProperty('getByMapper');
		});

		it('should have <getByKeys> method', () => {
			expect(Store.prototype).toHaveProperty('getByKeys');
			expectTypeOf(Store.prototype).toHaveProperty('getByKeys');
		});

		it('should have <getByTruthy> method', () => {
			expect(Store.prototype).toHaveProperty('getByTruthy');
			expectTypeOf(Store.prototype).toHaveProperty('getByTruthy');
		});
	});

	describe('Setter', () => {
		it('should have <set> method', () => {
			expect(Store.prototype).toHaveProperty('set');
			expectTypeOf(Store.prototype).toHaveProperty('set');
		});

		it('should have <setByKeyValue> method', () => {
			expect(Store.prototype).toHaveProperty('setByKeyValue');
			expectTypeOf(Store.prototype).toHaveProperty('setByKeyValue');
		});

		it('should have <setByKeySetter> method', () => {
			expect(Store.prototype).toHaveProperty('setByKeySetter');
			expectTypeOf(Store.prototype).toHaveProperty('setByKeySetter');
		});

		it('should have <setBySetter> method', () => {
			expect(Store.prototype).toHaveProperty('setBySetter');
			expectTypeOf(Store.prototype).toHaveProperty('setBySetter');
		});

		it('should have <setByPair> method', () => {
			expect(Store.prototype).toHaveProperty('setByPair');
			expectTypeOf(Store.prototype).toHaveProperty('setByPair');
		});
	});
});
