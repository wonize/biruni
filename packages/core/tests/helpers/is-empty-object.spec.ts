import { isEmptyObject } from '@/helpers/is-empty-object';

describe('helpers/is-empty-object.ts', () => {
	it('signature should be function accept unknown input and return boolean', () => {
		expect(isEmptyObject).toBeTypeOf('function');
		expectTypeOf(isEmptyObject).toBeFunction();
		expectTypeOf(isEmptyObject).parameter(0).toBeObject();
		expectTypeOf(isEmptyObject).returns.toBeBoolean();
	});

	it('should return true when input is empty object', () => {
		expect(isEmptyObject({})).toBeTruthy();
		expect(isEmptyObject({})).not.toBeFalsy();
	});

	it('should return false when input is not empty object', () => {
		expect(isEmptyObject({ key: 'value ' })).toBeFalsy();
		expect(isEmptyObject({ key: 'value' })).not.toBeTruthy();
	});

	it('should return true when input is not defined', () => {
		// @ts-expect-error to test nullable input
		expect(isEmptyObject()).toBeTruthy();
		// @ts-expect-error to test nullable inpu
		expect(isEmptyObject()).not.toBeFalsy();
	});
});
