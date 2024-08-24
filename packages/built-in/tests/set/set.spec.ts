import { SetAccessor } from '@/accessor';
import type { Path } from '@/path/mod';
import { DataFlow, type Core, type Plugin } from '@biruni/core';
import type { DeepPartial } from '@biruni/core/helpers/deep-partial';
import { mockData, type MockData } from '@repo/mocks';
import type { Mock } from 'vitest';

describe('Setter Accessor Boundaries', () => {
	let set_instance: Plugin<MockData>;
	const core_instance = {
		data: mockData,
		plugins: new Map(),
		bound: vi.fn(),
		process: vi.fn().mockImplementation((_, fn) => {
			return fn(mockData);
		}),
	} as unknown as Core<MockData>;

	beforeEach(() => {
		set_instance = new SetAccessor<MockData>();
		core_instance['plugins'].set(set_instance.name, set_instance);
		(core_instance.bound as Mock).mockClear();
		(core_instance.process as Mock).mockClear();
		set_instance.setup(core_instance);
	});

	describe.todo('on Setup', () => {
		it('invoke correctly by <Core> instance', () => {
			expect(set_instance.setup).toBeCalledTimes(1);
			expect(set_instance.setup).toBeCalledWith(expect.objectContaining(core_instance));
		});
	});

	it.todo('should bound to <Core> instance', () => {
		expect(core_instance.bound).toBeCalledTimes(6);

		expect(core_instance.bound).nthCalledWith(
			2,
			'setByPair',
			(set_instance as SetAccessor<MockData>).setByPair.bind(set_instance)
		);

		expect(core_instance.bound).nthCalledWith(
			3,
			'setBySetter',
			(set_instance as SetAccessor<MockData>).setBySetter.bind(set_instance)
		);

		expect(core_instance.bound).nthCalledWith(
			4,
			'setByKeySetter',
			(set_instance as SetAccessor<MockData>).setByKeySetter.bind(set_instance)
		);

		expect(core_instance.bound).nthCalledWith(
			5,
			'setByKey',
			(set_instance as SetAccessor<MockData>).setByKeyValue.bind(set_instance)
		);

		expect(core_instance.bound).nthCalledWith(
			6,
			'setByKeyValue',
			(set_instance as SetAccessor<MockData>).setByKeyValue.bind(set_instance)
		);
	});

	const instance = expectTypeOf(SetAccessor<MockData>).instance;
	// FIXME: mock <init> method // const store = core_instance.init(() => mockData);

	describe('Method <ByPair>', () => {
		it('should be exists in <SetAccessor> prototype', () => {
			expect(set_instance).toHaveProperty('setByPair');
			const property = instance.toHaveProperty('setByPair');
			property.toBeFunction();
			property.parameter(0).toBeObject();
			property.parameter(0).toEqualTypeOf<DeepPartial<MockData>>();
			property.returns.toBeVoid();
		});

		it.todo('should invoke <Core.process> with <DataFlow.INPUT> and update <Core.data>', () => {
			const data = expect.objectContaining({ ...mockData, lang: 'FR' });
			// store.setByPair({ lang: 'FR' });
			expect(core_instance['data']).toStrictEqual(data);
			expect(core_instance.process).toBeCalledWith(DataFlow.INPUT, data);
		});
	});

	describe('Method <BySetter>', () => {
		it('should be available in <SetAccessor> prototype', async () => {
			expect(set_instance).toHaveProperty('setBySetter');
			const property = instance.toHaveProperty('setBySetter');
			property.toBeFunction();
			property.parameter(0).toBeFunction();
			property.parameter(0).parameter(0).toBeObject();
			property.parameter(0).returns.toEqualTypeOf<DeepPartial<MockData>>();
			property.returns.toBeVoid();
		});

		it.todo(
			'should invoke <Core.process> with <DataFlow.INPUT> and update <Core.data>',
			async () => {
				const setter = vi.fn().mockReturnValue({ lang: 'FR' });
				const data = expect.objectContaining({ ...mockData, lang: 'FR' });
				// store.setBySetter(setter);
				expect(core_instance['data']).toStrictEqual(data);
				expect(core_instance.process).toBeCalledWith(DataFlow.INPUT, data);
			}
		);
	});

	describe('Method <ByKeySetter>', () => {
		it('should be exists in <SetAccessor> prototype', () => {
			expect(set_instance).toHaveProperty('setByKeySetter');
			const property = instance.toHaveProperty('setByKeySetter');
			property.toBeFunction();
			property.parameter(0).toBeString();
			property.parameter(1).toBeFunction();
			property
				.parameter(1)
				.parameter(0)
				.toEqualTypeOf<Readonly<Path.At<MockData, Path.From<MockData>>>>();
			property.returns.toBeVoid();
		});

		it.todo('should invoke <Core.process> with <DataFlow.INPUT> and update <Core.data>', () => {
			const setter = vi.fn().mockReturnValue('FR');
			const data = { ...mockData, lang: 'FR' };
			// store.setByKeySetter('lang', setter);
			expect(core_instance['data']).toStrictEqual(data);
			expect(core_instance.process).toBeCalledWith(DataFlow.INPUT, data);
		});
	});

	describe('Method <ByKeyValue>', () => {
		it('should be exists in <SetAccessor> prototype', () => {
			expect(set_instance).toHaveProperty('setByKeyValue');
			const property = instance.toHaveProperty('setByKeyValue');
			property.toBeFunction();
			property.parameter(0).toBeString();
			property.returns.toBeVoid();
		});

		it.todo(
			'should invoke <Core.process> with <DataFlow.INPUT> and update <Core.data> correctly',
			() => {
				const data = expect.objectContaining({ ...mockData, lang: 'FR' });
				// store.setByKey('lang', 'FR');
				expect(core_instance['data']).toStrictEqual(data);
				expect(core_instance.process).toBeCalledWith(DataFlow.INPUT, data);
			}
		);
	});
});
