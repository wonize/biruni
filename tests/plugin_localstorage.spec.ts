import { LocalStoragePersister, LocalStoragePlugin, NativeJsonPlugin, biruni, type Core } from "@/core/mod";
import { beforeAll, describe, it, vi } from 'vitest';

describe('Biruni :: simple setup', () => {
	const biruniLocalStorageSetSpy = vi.spyOn(LocalStoragePersister.prototype, 'set');
	const browserLocalStorageSetSpy = vi.spyOn(Storage.prototype, 'setItem');

	let store: Core<{ count: number }>;
	beforeAll(() => {
		store = biruni()
			.plug(NativeJsonPlugin())
			.plug(LocalStoragePlugin('b-key'))
			.init(() => ({ count: 9 }));
	})

	it('should iniailize by correct value', () => {
		const expection = { "$$value": JSON.stringify({ count: 9 }) };
		expect(biruniLocalStorageSetSpy).toBeCalledWith(expection);
	})

	it('should biruni <localStorage.set> called once', () => {
		expect(biruniLocalStorageSetSpy).toBeCalledTimes(1);
	})

	it('should browser <localStorage.set> called once', () => {
		expect(browserLocalStorageSetSpy).toBeCalledTimes(1);
	})

	it('should restore initialized value', () => {
		const expectedObject = { count: 9 };
		const expectedString = JSON.stringify(expectedObject);
		expect(store.get()).resolves.toMatchObject(expectedObject);
		expect(localStorage.getItem('b-key')).toStrictEqual(expectedString);
	})

	it('should override initialized value', () => {
		const expection = { "$$value": JSON.stringify({ count: 7 }) };
		store.set(() => ({ count: 7 }));
		expect(biruniLocalStorageSetSpy).toBeCalledWith(expection);
	})

	it('should biruni <localStorage.set> called twice', () => {
		expect(biruniLocalStorageSetSpy).toBeCalledTimes(2);
	})

	it('should native <localStorage.set> called twice', () => {
		expect(browserLocalStorageSetSpy).toBeCalledTimes(2);
	})

	it('should restore overrided value', () => {
		expect(store.get()).resolves.toMatchObject({ count: 7 });
	})

	afterAll(() => {
		biruniLocalStorageSetSpy.mockClear();
		biruniLocalStorageSetSpy.mockReset();
		browserLocalStorageSetSpy.mockClear();
		browserLocalStorageSetSpy.mockReset();
	})
})
