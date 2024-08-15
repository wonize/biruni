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

const clearMockStorage = function clear_mock_storage() {
	vi.clearAllMocks();
	vi.clearAllTimers();
	return void 0;
};

export { clearMockStorage, MOCK_NAMESPACE, mockData, mockInitializer };
export type { ExactMockData, MockData };
