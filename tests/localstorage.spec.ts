import { vi, it, describe, expect, beforeAll } from 'vitest';

describe('persisted data in mock of localStorage', () => {
	const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
	const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

	beforeAll(() => {
		localStorage.setItem('is-mock-work', 'yes-is-mocked');
	});

	it('should have <is-mock-work> key as first key', () => {
		expect(localStorage.key(0)).toStrictEqual('is-mock-work');
	});

	it('should have only <1> key in storage', () => {
		expect(localStorage.length).toStrictEqual(1);
	});

	it('should restored persist data', () => {
		expect(localStorage.getItem('is-mock-work')).toStrictEqual('yes-is-mocked');
	});

	it('should be null the persisted data', () => {
		localStorage.removeItem('is-mock-work');
		expect(localStorage.getItem('is-mock-work')).toBeNull();
	});

	it('should restored by <getItem> by <is-mock-work> key', () => {
		expect(localStorage.getItem).toBeCalledWith('is-mock-work');
		expect(localStorage.getItem).toBeCalledTimes(2);
	});

	it('should stored by <setItem> method by <is-mock-work> key', () => {
		expect(localStorage.setItem).toBeCalledWith('is-mock-work', 'yes-is-mocked');
		expect(localStorage.setItem).toBeCalledTimes(1);
	});

	it('should stored by <removeItem> method by <is-mock-work> key', () => {
		expect(localStorage.removeItem).toBeCalledWith('is-mock-work');
		expect(localStorage.removeItem).toBeCalledTimes(1);
	});

	afterAll(() => {
		vi.clearAllMocks();
		getItemSpy.mockReset();
		getItemSpy.mockClear();
		setItemSpy.mockReset();
		setItemSpy.mockClear();
		localStorage.clear();
	});
});
