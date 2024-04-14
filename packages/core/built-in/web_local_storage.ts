import type { Fn } from "../chain";
import type { ParserCore } from "../parser";
import type { PersistenceCore, PersistenceContext } from "../persistence";
import type { ValidatorCore } from "../validator";

class BiruniLocalStorageApi<V extends object> implements PersistenceCore<V> {
	public constructor(
		private validator?: ValidatorCore<V>,
		private parser?: ParserCore<V>,
	) { }

	public async set<TValue extends V, TKey extends string>(tag: { $$value: TValue, $$key: TKey }): Promise<void> {
		const isValid = this.validator.validate(tag.$$value);
		if (isValid !== false) throw 'some pipe were broken';

		const stringified = this.parser.stringify(tag.$$value);
		return localStorage.setItem(tag.$$key, stringified)
	}

	public async get<TValue extends V, TKey extends string>(tag: { $$key: TKey; }): Promise<{ $$value: TValue; }> {
		const value = localStorage.getItem(tag.$$key);
		const parsed = this.parser.parse<TValue>(value ?? 'false');
		if (typeof parsed === 'boolean' && parsed === false) {
			throw 'some pipe cannot be parse from string';
		}

		return { $$value: parsed }
	}
}

export function LocalStoragePlugin<TKey extends string, V extends object>(key: TKey)
	: Fn<PersistenceContext<V>> {
	return function () {
		return {
			'$$type': 'persistence',
			'$$instance': new BiruniLocalStorageApi() as any
		}
	}
}

export { BiruniLocalStorageApi as LocalStorageApi };
