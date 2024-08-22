/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Mock } from 'vitest';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Constructorable<Prototype extends object = any> = {
	new (...args: any[]): Prototype;
	prototype: Prototype;
};

type GetKlass<P extends object = any, O extends Options<P> = Options<P>> = Required<
	O extends undefined
		? Record<keyof P, Mock>
		: O extends Array<keyof P> | ReadonlyArray<keyof P>
			? { [Key in keyof Omit<P, O[number]>]: P[Key] } & { [Key in O[number]]: Mock }
			: O extends object
				? { [Key in keyof Omit<P, keyof O>]: P[Key] } & { [Key in keyof O]: O[Key] }
				: { [Key in keyof P]: Mock }
>;

type Options<P extends object = any> =
	| Partial<Array<keyof P>>
	| Partial<{ [Key in keyof P]: P[Key] }>
	| undefined;
//	| ((instance: any) => unknown);

export function mockThis<P extends object = any, O extends Options<P> = Options<P>>(
	Klass: Constructorable<P>,
	options?: O
): GetKlass<P, O> {
	if (typeof options === 'object' && options !== null && options instanceof Array) {
		class MockKlass extends (Klass as any) {}
		const klass = new MockKlass();
		for (const property of options) {
			(klass as any)[property as unknown as keyof typeof klass] = vi.fn();
		}
		return klass as unknown as GetKlass<P, O>;
	} else if (typeof options === 'object' && options !== null) {
		class MockKlass extends (Klass as any) {}
		const klass = new MockKlass();
		for (const property in options) {
			(klass as any)[property as unknown as keyof typeof klass] = (options as any)[property];
		}
		return klass as unknown as GetKlass<P, O>;
	} else if (typeof options === 'function') {
		throw 'Not Yet <function> mocker';
	} else {
		class MockKlass extends (Klass as any) {}
		const klass = new MockKlass();
		for (const property in klass) {
			(klass as any)[property as unknown as keyof typeof klass] = vi.fn();
		}
		return klass as unknown as GetKlass<P, O>;
	}
}
