import { mockThis } from './from';

class MyCustom {
	public getHelloWorld() {
		return 'Hello, World';
	}

	public getNice() {
		return 'Nice Realy!';
	}
}

describe('mockThis', () => {
	const custom = mockThis(MyCustom, {
		getNice: vi.fn().mockReturnValue('Fantastic!'),
	});

	it('should <getHelloWorld> not mocked', () => {
		expect(custom.getHelloWorld()).toBe('Hello, World');
	});

	it('should <getHelloWorld> not mocked instance', () => {
		expect(() => {
			expect(custom.getHelloWorld).toReturnWith('Hello, World');
		}).toThrowError();
	});

	it('should <getNice> to return Mocked Value', () => {
		expect(custom.getNice()).toBe('Fantastic!');
	});

	it('should be called <getNice>', () => {
		expect(custom.getNice).toReturnWith('Fantastic!');
	});
});
