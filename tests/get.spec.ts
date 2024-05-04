import biruni, { type Store } from 'biruni';
import { json, localstorage } from 'biruni/built-in';
import { beforeAll, describe, expect, it, vi } from 'vitest';

describe.skip('Biruni/Core/Get', () => {
	const stubString = {
		count9: "{\"count\":9}",
		unit_times: "{\"unit\":\"times\"}",
		whole: "{\"count\":9,\"unit\":\"times\"}",
		// ^IMPORTANT: the order is matter and work for only { count: 9, unit: 'times' }
	}

	const stubObject = {
		count9: { count: 9 },
		value9: { value: 9 },
		unit_times: { unit: 'times' },
		whole: { count: 9, unit: 'times' },
	}

	type FakeStore = {
		count: number;
		unit: 'times' | 'match' | string;
	}

	let store: Store<FakeStore>;
	let storeGetSpy: any;
	beforeAll(() => {
		store = biruni()
			.plug(json())
			.plug(localstorage('b-mock-key'))
			.init(() => stubObject.whole);
		storeGetSpy = vi.spyOn(store, 'get');
	});

	it('should return the bunch of whole data stored', () => {
		expect(store.get())
			.resolves.toStrictEqual(stubObject.whole);
	})

	it('should return passed single key to first argument', () => {
		expect(store.get('count'))
			.resolves.toStrictEqual(stubObject.count9.count);
		expect(store.get('unit'))
			.resolves.toStrictEqual(stubObject.unit_times.unit);
	})

	it('should return passed Key/Boolean pair to first argument', () => {
		expect(store.get({ count: true }))
			.resolves.toStrictEqual(stubObject.count9);
		expect(store.get({ count: true, unit: false }))
			.resolves.toStrictEqual(stubObject.count9);
	})

	it('should return passed keys by array to first argument', () => {
		expect(store.get(['count']))
			.resolves.toStrictEqual(stubObject.count9);
	})

	it('should return passed selector function', () => {
		expect(store.get(d => d))
			.resolves.toStrictEqual(stubObject.whole);
	})

	it('should return passed selector function and change keys', () => {
		expect(store.get(d => ({ value: d.count })))
			.resolves.toStrictEqual(stubObject.value9);
	})

	it('should return selector function to special key', () => {
		expect(store.get('count', count => ({ value: count })))
			.resolves.toStrictEqual(stubObject.value9);
	})

	it('should have been called at least', () => {
		expect(storeGetSpy).toHaveBeenCalled();
	})
});
