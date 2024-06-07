import type { PluginStack } from '@biruni/core/plugin/stack';
import { Store } from '@biruni/core/store';
import { makePlugin } from '@biruni/factory/builder';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mock_listener = function mock_listener_impl(_event: string, _listener: unknown) {
	return void 0;
};

const mock_process = async function mock_process_impl(data: MockData): Promise<MockData> {
	return data;
};

const mockPluginStack: PluginStack<MockData> = [
	makePlugin<MockData>('mock/persister')
		.withType('persister')
		.withPostProcess(mock_process)
		.withPreProcess(mock_process)
		.make(),
	makePlugin<MockData>('mock/parser')
		.withType('parser')
		.withPostProcess(mock_process)
		.withPreProcess(mock_process)
		.make(),
	makePlugin<MockData>('mock/validator')
		.withType('validator')
		.withPostProcess(mock_process)
		.withPreProcess(mock_process)
		.make(),
	makePlugin<MockData>('mock/synchronizer')
		.withType('synchronizer')
		.withPostProcess(mock_process)
		.withPreProcess(mock_process)
		.withAddListener(mock_listener)
		.withRemoveListener(mock_listener)
		.make(),
];

interface MockData {
	theme: 'DARK' | 'LIGHT';
	lang: 'FR' | 'EN' | 'ES';
	value: 1 | 2 | 3;
	currency: {
		amount: number;
		code: 'USD' | 'EUR' | 'GBP';
	};
}

const mockData: MockData = {
	theme: 'DARK',
	lang: 'EN',
	value: 2,
	currency: {
		code: 'USD',
		amount: 1000,
	},
};

interface ExactMockData {
	theme: 'DARK';
	lang: 'EN';
	value: 2;
	currency: {
		code: 'USD';
		amount: number;
	};
}

const mockInitializer = function mock_initialize_impl(): MockData {
	return mockData;
};

const mockStore = new Store(mockInitializer, mockPluginStack);

export { mockData, mockInitializer, mockStore };
export type { MockData, ExactMockData };
