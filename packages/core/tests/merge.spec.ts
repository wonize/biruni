import { describe, expect, test } from 'vitest';
import { mergeFresh as merge } from '../src/helpers/merge';

describe('Core/Helper/MergeFresh', () => {
	test('Merge with same data in <source> and <target>', () => {
		const source = { language: 'en-US', theme: 'dark' };
		const target = { language: 'en-US', theme: 'dark' };
		const result = merge(source, target);
		expect(result).toStrictEqual(source);
	});

	test('Merge with override properties in <target> with properties in <source>', () => {
		const source = { language: 'en-US', theme: 'dark' };
		const target = { language: 'zh-CN', theme: 'light' };
		const result = merge(source, target);
		expect(result).toStrictEqual(source);
	});

	test('Merge with remove properties in <source> when not exists in properties in <target>', () => {
		const source = { language: 'en-US', theme: 'dark' };
		const target = { language: 'en-US', };
		const result = merge(source, target);
		expect(result).toStrictEqual(target);
	});

	test('Merge with remove properties in <source> when not exists in <target> properties with keep value from <source>', () => {
		const source = { language: 'en-US', theme: 'dark' };
		const target = { language: 'zh-CN', };
		const result = merge(source, target);
		expect(result).toStrictEqual({ language: 'en-US' });
	});

	test('Merge with add properties in <target> when not exists in <source> properties with keep value from <source>', () => {
		const source = { language: 'en-US', };
		const target = { language: 'zh-CN', theme: 'dark' };
		const result = merge(source, target);
		expect(result).toStrictEqual({ language: 'en-US', theme: 'dark' });
	});

	test('Merge with same properties but update value in <source> was changed in <target> to object', () => {
		const source = { language: 'en-US', theme: 'dark' };
		const target = { language: { code: 'en', version: 'US' }, theme: 'dark' };
		const result = merge(source, target);
		expect(result).toStrictEqual({ language: { code: 'en', version: 'US' }, theme: 'dark' });
	});

	test('Merge with same properties but update value in <source> was changed in <target> to object, keep another peroperties', () => {
		const source = { language: 'en-US', theme: 'dark' };
		const target = { language: { code: 'zh', version: 'CH' }, theme: 'light' };
		const result = merge(source, target);
		expect(result).toStrictEqual({ language: { code: 'zh', version: 'CH' }, theme: 'dark' });
	});

	test('Merge with same properties but update value in <source> was changed in <target> to primitives', () => {
		const source = { language: { code: 'en', version: 'US' }, theme: 'dark' };
		const target = { language: 'en-US', theme: 'dark' };
		const result = merge(source, target);
		expect(result).toStrictEqual({ language: 'en-US', theme: 'dark' });
	});

	test('Merge nested properties when root property is same with keep data from <source>', () => {
		const source = { language: { code: 'en', version: 'US' } };
		const target = { language: { code: 'zh', version: 'CH' } };
		const result = merge(source, target);
		expect(result).toEqual({ language: { code: 'en', version: 'US' } });
	});

	test('Merge with keep Array-like values from <source>', () => {
		const source = { resolutions: ['HD', 'QHD', 'FHD'] };
		const target = { resolutions: ['2K', 'QHD', '8K'] };
		const result = merge(source, target);
		expect(result).toEqual({ resolutions: ['HD', 'QHD', 'FHD'] });
	});

	test('Merge empty object for both <source> and <target>', () => {
		const source = {};
		const target = {};
		const result = merge(source, target);
		expect(result).toEqual({});
	});

	test('Merge empty <source> with non-empty <target>, keep properties and values from <target>', () => {
		const source = {};
		const target = { language: 'en-US' };
		const result = merge(source, target);
		expect(result).toEqual({ language: 'en-US' });
	})

	test('Merge empty <target> with non-empty <source>, keep properties and values from <source>', () => {
		const source = { language: 'en-US' };
		const target = {};
		const result = merge(source, target);
		expect(result).toEqual({ language: 'en-US' });
	})
});
