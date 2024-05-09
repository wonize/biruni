import biruni, { type Store } from 'biruni';
import { json, localstorage } from 'biruni/built-in';
import { beforeAll, describe, expect, it, test, vi } from 'vitest';

describe.todo('Core/Get', () => {
	type FakeStore = {
		count: number;
		unit: 'times' | 'click' | string;
	};

	describe('get() overloads', () => {
		let fakeStore: Store<FakeStore>;
		let storeGetSpy: any;
		beforeAll(() => {
			fakeStore = biruni()
				.plug(json())
				.plug(localstorage('biruni-mock-namespace'))
				.init(() => ({ count: 9, unit: 'click' }));
			storeGetSpy = vi.spyOn(fakeStore, 'get');
		});

		test('Entire overload <w/o input>', async () => {
			const case_entire = await fakeStore.get();
			expect(case_entire).toStrictEqual({ count: 9, unit: 'click' });
		});

		test('Key/Value overload', async () => {
			const case_count = await fakeStore.get('count');
			expect(case_count).resolves.toStrictEqual(9);

			const case_unit = await fakeStore.get('unit');
			expect(case_unit).resolves.toStrictEqual('click');
		});

		test('Truthy overload', async () => {
			const case_only_count = await fakeStore.get({ count: true });
			expect(case_only_count).toStrictEqual({ count: 9 });

			const case_count = await fakeStore.get({ count: true, unit: false });
			expect(case_count).toStrictEqual({ count: 9 });
		});

		test('Array of Keys overload', async () => {
			const case_one = await fakeStore.get(['count']);
			expect(case_one).toStrictEqual({ count: 9 });

			const case_many = await fakeStore.get(['count', 'unit']);
			expect(case_many).toStrictEqual({ count: 9, unit: 'click' });
		});

		test('Mapper overload', async () => {
			const case_entire = await fakeStore.get((data) => data);
			expect(case_entire).toBeTypeOf('object');
			expect(case_entire).toStrictEqual({ count: 9, unit: 'click' });

			const case_modifier = await fakeStore.get((data) => `the count: ${data.count}`);
			expect(case_modifier).toBeTypeOf('string');
			expect(case_modifier).toStrictEqual('the count: 9');

			const case_selector = await fakeStore.get((data) => data.unit);
			expect(case_selector).toBeTypeOf('string');
			expect(case_selector).toStrictEqual('click');
		});

		test('Key/Mapper overload', async () => {
			const case_reshape = await fakeStore.get('count', (count) => {
				return { value: count };
			});
			expect(case_reshape).toStrictEqual({ value: 9 });
		});

		it('should have been called at least', () => {
			expect(storeGetSpy).toHaveBeenCalled();
		});
	});

	describe('getByEntire()', () => {});
});
