import {
	EventPlugin,
	GetAccessor,
	HasAccessor,
	LocalStoragePlugin,
	SetAccessor,
	JsonPlugin,
} from '@/mod';
import { StarterPack, starter } from '@/starter';
import Core, { Plugin } from '@biruni/core';
import { MOCK_NAMESPACE, type MockData } from '@repo/mocks';

vi.mock('@/json/mod.ts');
vi.mock('@/event/mod.ts');
vi.mock('@/localstorage/mod.ts');
vi.mock('@/accessor.ts');

describe('StarterPack', () => {
	it('is a <Plugin> interface', () => {
		expectTypeOf(StarterPack<MockData>).instance.toMatchTypeOf<Plugin<MockData>>();
	});

	it('have no constructor argument', () => {
		expectTypeOf(StarterPack<MockData>).constructorParameters.toEqualTypeOf<[]>();
	});

	it('plug correctly the set of plugins', () => {
		const core = new Core<MockData>(MOCK_NAMESPACE);
		core.plug(new StarterPack<MockData>());

		expect(JsonPlugin.prototype.setup, 'JsonPlugin.setup').toHaveBeenCalledWith(
			expect.objectContaining(core)
		);
		expect(EventPlugin.prototype.setup, 'EventPlugin.setup').toHaveBeenCalledWith(
			expect.objectContaining(core)
		);
		expect(SetAccessor.prototype.setup, 'SetAccessor.setup').toHaveBeenCalledWith(
			expect.objectContaining(core)
		);
		expect(GetAccessor.prototype.setup, 'GetAccessor.setup').toHaveBeenCalledWith(
			expect.objectContaining(core)
		);
		expect(HasAccessor.prototype.setup, 'HasAccessor.setup').toHaveBeenCalledWith(
			expect.objectContaining(core)
		);
		expect(LocalStoragePlugin.prototype.setup, 'LocalStoragePlugin.setup').toHaveBeenCalledWith(
			expect.objectContaining(core)
		);
	});
});

describe('starter', () => {
	it('is a <function>', () => {
		expectTypeOf(starter).toBeFunction();
		expect(starter).toBeTypeOf('function');
	});

	it('require no argument', () => {
		expectTypeOf(starter).parameters.toEqualTypeOf<[]>();
	});

	it('return instance of <StarterPack> plugin', () => {
		expectTypeOf(starter<MockData>).returns.toEqualTypeOf<StarterPack<MockData>>();
	});
});
