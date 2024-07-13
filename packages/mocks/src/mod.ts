import type { PluginStack } from '@biruni/core/plugin/stack';
import { Store, type StoreInterface } from '@biruni/core/store';
import { makePlugin } from '@biruni/factory/builder';
import { vi } from 'vitest';

const MOCK_NAMESPACE = 'mock-biruni-namespace' as const;

interface MockData {
	theme: 'DARK' | 'LIGHT';
	lang: 'FR' | 'EN' | 'ES';
	value: 1 | 2 | 3;
	currency: {
		amount: number;
		code: 'USD' | 'EUR' | 'GBP';
	};
}

interface ExactMockData {
	theme: 'DARK';
	lang: 'EN';
	value: 2;
	currency: {
		code: 'USD';
		amount: number;
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

const mockInitializer = function mock_initialize_impl(): MockData {
	return mockData;
};

const mockSet = vi.fn<[PropertyKey, unknown], void>();
const mockGet = vi.fn<[PropertyKey], MockData | undefined>();
const mockInMemoryStorage = {
	set: mockSet,
	get: mockGet,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mock_listener = function mock_listener_impl(_event: string, _listener: unknown) {
	return void 0;
};

const mock_process = async function mock_process_impl(data: MockData): Promise<MockData> {
	return data;
};

const mock_persist_set = async function mock_persist_set_impl(data: MockData): Promise<MockData> {
	mockInMemoryStorage.set(MOCK_NAMESPACE, data);
	return data;
};

const mock_persist_get = async function mock_persist_get_impl(data: MockData): Promise<MockData> {
	const retrieved = mockInMemoryStorage.get(MOCK_NAMESPACE);
	return retrieved ?? data;
};

const mockPluginStack: PluginStack<MockData> = [
	makePlugin<MockData>('mock/persister')
		.withType('persister')
		.withPostProcess(mock_persist_set)
		.withPreProcess(mock_persist_get)
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

const makeMockStore = function make_mock_store(): StoreInterface<MockData> {
	return new Store(mockInitializer, mockPluginStack);
};

const mockStore: StoreInterface<MockData> = makeMockStore();

const clearMockStorage = function clear_mock_storage() {
	vi.clearAllMocks();
	vi.clearAllTimers();
	mockSet.mockReset();
	mockSet.mockClear();
	mockGet.mockReset();
	mockGet.mockClear();
	return void 0;
};

export {
	MOCK_NAMESPACE,
	clearMockStorage,
	makeMockStore,
	mockData,
	mockGet,
	mockInMemoryStorage,
	mockInitializer,
	mockPluginStack,
	mockSet,
	mockInMemoryStorage as mockStorage,
	mockStore,
};
export type { ExactMockData, MockData };
