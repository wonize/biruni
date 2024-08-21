import * as mod from '@/accessor';

it('should re-export <GetAccessor> and <getter>', () => {
	expect(mod).toHaveProperty('GetAccessor');
	expect(mod.GetAccessor).toBeTypeOf('object');
	expect(mod.GetAccessor).not.toBeNull();
	expect(mod.GetAccessor).not.toBeInstanceOf(Array);
	expect(mod.getter).toBeTypeOf('function');
	expect(mod).toHaveProperty('getter');
});

it('should re-export <SetAccessor> and <setter>', () => {
	expect(mod).toHaveProperty('SetAccessor');
	expect(mod.SetAccessor).toBeTypeOf('object');
	expect(mod.SetAccessor).not.toBeNull();
	expect(mod.SetAccessor).not.toBeInstanceOf(Array);
	expect(mod).toHaveProperty('setter');
	expect(mod.setter).toBeTypeOf('function');
});

it('should export <HasAccessor>, <hasOwn>', () => {
	expect(mod).toHaveProperty('HasAccessor');
	expect(mod.HasAccessor).toBeTypeOf('object');
	expect(mod.HasAccessor).not.toBeNull();
	expect(mod.SetAccessor).not.toBeInstanceOf(Array);
	expect(mod).toHaveProperty('hasOwn');
	expect(mod.hasOwn).toBeTypeOf('function');
});

it('should export <PropertyAccessor> and <accessorizer>', () => {
	expect(mod).toHaveProperty('PropertyAccessor');
	expect(mod.PropertyAccessor).toBeTypeOf('object');
	expect(mod.PropertyAccessor).not.toBeNull();
	expect(mod.PropertyAccessor).not.toBeInstanceOf(Array);
	expect(mod).toHaveProperty('accessorizer');
	expect(mod.accessorizer).toBeTypeOf('function');
});
