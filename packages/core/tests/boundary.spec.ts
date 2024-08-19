import { Boundary } from '@/boundary';

describe('Boundary class', () => {
	type CustomBoundary = {
		get: (key: string) => string;
		has: (key: string) => boolean;
		set: (key: string, value: string) => string;
	};
	const remove = vi.fn();
	const initial_boundaries = { has: vi.fn(), get: vi.fn(), set: vi.fn() };
	const boundary = new Boundary<CustomBoundary>(initial_boundaries);

	describe('.inject', () => {
		const inject = expectTypeOf(Boundary<CustomBoundary>).instance.toHaveProperty('inject');

		it('should be a method of <Boundary> instance', () => {
			expect(boundary).toHaveProperty('inject');
		});

		it('should be a function', () => {
			inject.toBeFunction();
		});

		it('should accept a <string> as the first argument', () => {
			inject.parameter(0).toBeString();
		});

		it('should accept a <unknown> as the second argument', () => {
			inject.parameter(1).toBeUnknown();
		});

		it('should return an object shape', () => {
			inject.returns.toBeObject();
		});

		it('should inject a function into the boundary', () => {
			const result = boundary.inject('remove', remove);
			expect(result).toHaveProperty('remove');
			expect(result.remove).toBe(remove);
		});
	});

	describe('.eject', () => {
		const eject = expectTypeOf(Boundary<CustomBoundary>).instance.toHaveProperty('eject');

		it('should be a method of <Boundary> instance', () => {
			expect(boundary).toHaveProperty('eject');
		});

		it('should be a function', () => {
			eject.toBeFunction();
		});

		it('should accept no arguments', () => {
			eject.parameters.toEqualTypeOf<[]>();
		});

		it('should return an object shape matching <Generic> argument', () => {
			eject.returns.toBeObject();
			eject.returns.toEqualTypeOf<CustomBoundary>();
		});

		it('should eject the stored boundaries correctly', () => {
			const boundaries = boundary.eject();
			expect(boundaries).toEqual(expect.objectContaining({ ...initial_boundaries, remove }));
		});
	});

	describe('.constructor', () => {
		it('should accept an optional initial <Record> of boundaries', () => {
			type EmptyConstructorArgument = [];
			type InitialConstructorArguments = [boundaries?: Record<string, unknown>];
			type ConstructorArguments = EmptyConstructorArgument | InitialConstructorArguments;
			expectTypeOf(Boundary).constructorParameters.toEqualTypeOf<ConstructorArguments>();
		});
	});
});
