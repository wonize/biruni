import * as mod from '@/accessor';

describe('GetAccessor', () => {
	it('should be defined in <accessor.ts> file', () => {
		expect(mod).toHaveProperty('GetAccessor');
		expect(mod.GetAccessor).toBeDefined();
	});

	it('should be an <Constructor>', () => {
		expect(mod.GetAccessor).constructor();
	});
});

describe('getter', () => {
	it('should be defined in <accessor.ts> file', () => {
		expect(mod).toHaveProperty('getter');
		expect(mod.getter).toBeDefined();
	});

	it('should be a <function>', () => {
		expect(mod.getter).toBeTypeOf('function');
	});
});

describe('SetAccessor', () => {
	it('should be defined in <accessor.ts> file', () => {
		expect(mod).toHaveProperty('SetAccessor');
		expect(mod.SetAccessor).toBeDefined();
	});

	it('should be an <Constructor>', () => {
		expect(mod.SetAccessor).constructor();
	});
});

describe('setter', () => {
	it('should be defined in <accessor.ts> file', () => {
		expect(mod).toHaveProperty('setter');
		expect(mod.setter).toBeDefined();
	});

	it('should be a <function>', () => {
		expect(mod.setter).toBeTypeOf('function');
	});
});

describe('HasAccessor', () => {
	it('should be defined in <accessor.ts> file', () => {
		expect(mod).toHaveProperty('HasAccessor');
		expect(mod.HasAccessor).toBeDefined();
	});

	it('should be an <Constructor>', () => {
		expect(mod.HasAccessor).constructor();
	});
});

describe('hasOwn', () => {
	it('should be defined in <accessor.ts> file', () => {
		expect(mod).toHaveProperty('hasOwn');
		expect(mod.hasOwn).toBeDefined();
	});

	it('should be a <function>', () => {
		expect(mod.hasOwn).toBeTypeOf('function');
	});
});

describe('PropertyAccessor', () => {
	it('should be defined in <accessor.ts> file', () => {
		expect(mod).toHaveProperty('PropertyAccessor');
		expect(mod.PropertyAccessor).toBeDefined();
	});

	it('should be an <Constructor>', () => {
		expect(mod.PropertyAccessor).constructor();
	});
});

describe('accessorizer', () => {
	it('should be defined in <accessor.ts> file', () => {
		expect(mod).toHaveProperty('accessorizer');
		expect(mod.accessorizer).toBeDefined();
	});

	it('should be a <function>', () => {
		expect(mod.accessorizer).toBeTypeOf('function');
	});
});
