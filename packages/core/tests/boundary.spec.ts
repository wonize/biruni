import { Boundary } from '@/boundary';

describe('core/boundary.ts', () => {
	describe('Abstraction', () => {
		type CustomBoundary = {
			get: (key: string) => string;
			has: (key: string) => boolean;
			set: (key: string, value: string) => string;
		};

		const prototype = expect(Boundary.prototype);
		const instance = expectTypeOf(Boundary<CustomBoundary>).instance;

		it('should to have constructor with intial boundaries', () => {
			expectTypeOf(Boundary).toBeConstructibleWith({
				has: (key: string): boolean => !!key === true,
			});
			expectTypeOf(Boundary).constructorParameters.toEqualTypeOf<
				[] | [boundaries?: Record<string, unknown>]
			>();
		});

		it('should to have <inject> method', () => {
			prototype.toHaveProperty('inject');
			const inject = instance.toHaveProperty('inject');
			inject.toBeFunction();
			inject.parameter(0).toBeString();
			inject.parameter(1).toBeUnknown();
			inject.returns.toBeObject();
		});

		it('should to have <eject> method', () => {
			prototype.toHaveProperty('eject');
			const eject = instance.toHaveProperty('eject');
			eject.toBeFunction();
			eject.parameter(0).toBeUndefined();
			eject.returns.toBeObject();
			eject.returns.toEqualTypeOf<CustomBoundary>();
		});
	});

	describe('Functionality', () => {
		type CustomBoundary = {
			get: (key: string) => string;
			has: (key: string) => boolean;
			set: (key: string, value: string) => string;
		};
		const has = vi.fn();
		const get = vi.fn();
		const set = vi.fn();
		const delete_boundary = vi.fn();
		const customBoundaries = { has, get, set };
		const boundary = new Boundary<CustomBoundary>(customBoundaries);

		const spy_inject = vi.spyOn(boundary, 'inject');
		it('should inject object', () => {
			boundary.inject('delete', delete_boundary);
			expect(spy_inject).toBeCalledTimes(1);
			expect(spy_inject).toBeCalledWith('delete', delete_boundary);
			expect(spy_inject).toReturnWith(expect.objectContaining({ delete: delete_boundary }));
		});

		const spy_eject = vi.spyOn(boundary, 'eject');
		it('should eject object', () => {
			const ejected = boundary.eject();
			expect(spy_eject).toBeCalledTimes(1);
			expect(spy_eject).toBeCalledWith();
			expect(spy_eject).toReturnWith(expect.objectContaining({ delete: delete_boundary }));
			expect(ejected).toHaveProperty('delete');
			expect(ejected).toHaveProperty('has');
			expect(ejected).toHaveProperty('get');
			expect(ejected).toHaveProperty('set');
		});
	});
});
