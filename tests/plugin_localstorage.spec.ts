import { LocalStoragePlugin, NativeJsonPlugin, biruni } from "@/core/mod";

describe('Biruni LocalStorage', () => {
	let store: any;
	beforeAll(() => {
		store = biruni()
			.plug(NativeJsonPlugin())
			.plug(LocalStoragePlugin('b-key'))
			.init(() => ({ count: 9 }));
	})

	it('should work', () => {
		expect(store.get('b-key')).resolves.toMatchObject({ count: 9 });
	})
})
