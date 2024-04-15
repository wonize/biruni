import { LocalStoragePersister, LocalStoragePlugin, NativeJsonPlugin, biruni, type Core } from "@/core/mod";
import { beforeAll, describe, it, vi } from 'vitest';

describe('Biruni :: simple setup', () => {
	const setSpy = vi.spyOn(LocalStoragePersister.prototype, 'set');

	let store: Core<{ count: number }>;
	beforeAll(() => {
		store = biruni()
			.plug(NativeJsonPlugin())
			.plug(LocalStoragePlugin('b-key'))
			.init(() => ({ count: 9 }));
	})

	it('should iniailize by correct value', () => {
		const expection = { "$$value": JSON.stringify({ count: 9 }) };
		expect(setSpy).toBeCalledWith(expection);
	})

	it('should <localStorage.set> called once', () => {
		expect(setSpy).toBeCalledTimes(1);
	})

	it('should restore initialized value', () => {
		expect(store.get()).resolves.toMatchObject({ count: 9 });
	})

	it('should override initialized value', () => {
		const expection = { "$$value": JSON.stringify({ count: 7 }) };
		store.set(() => ({ count: 7 }));
		expect(setSpy).toBeCalledWith(expection);
	})

	it('should <localStorage.set> called twice', () => {
		expect(setSpy).toBeCalledTimes(2);
	})

	it('should restore overrided value', () => {
		expect(store.get()).resolves.toMatchObject({ count: 7 });
	})

	afterAll(() => {
		setSpy.mockClear();
		setSpy.mockReset();
	})
})
