import type { ParserContext } from './parser/context';
import type { PersisterContext } from './persister/context';
import type { PluginStruct } from './plugin/struct';
import type { SetFn, SetFnByKey, SetObject, SetObjectByKey } from './generic';

export class Core<S extends object> {
	public constructor(
		private initializer: () => S,
		private pluginStruct: PluginStruct<S>,
	) {
		this.setByValue(this.initializer());
	}

	async set<K = undefined>(o: SetObject<S>): Promise<void>;
	async set<K = undefined>(fn: SetFn<S>): Promise<void>;
	async set<K extends keyof S, V = SetObjectByKey<S, K>>(key: K, value: V): Promise<void>;
	async set<K extends keyof S, Fn = SetFnByKey<S, K>>(key: K, fn: Fn): Promise<void>;
	async set<
		K extends keyof S,
		P extends SetObject<S> | SetFn<S> | K,
		G = P extends K ? (S[P] | ((draft?: S[P]) => S[P])) : (P extends SetFn<S> ? never : never)
	>(KeyOrFnOrObj: P, FnOrObj?: G): Promise<void> {
		if (typeof KeyOrFnOrObj === 'function') {
			return this.setBySetter(KeyOrFnOrObj as SetFn<S>);
		} else if (typeof KeyOrFnOrObj === 'string') {
			if (typeof FnOrObj === 'function') {
				return this.setByKeySetter(KeyOrFnOrObj as K, FnOrObj as SetFnByKey<S, K>);
			} else {
				return this.setByKeyValue(KeyOrFnOrObj as K, FnOrObj as SetObjectByKey<S, K>);
			}
		} else {
			return this.setByValue(KeyOrFnOrObj as SetObject<S>);
		}
	}

	private async setBySetter(fn: SetFn<S>): Promise<void> {
		return new Promise(async (resolve) => {
			const parser = this.pluginStruct?.parser as ParserContext<S>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const stringified = parser.$$instance.stringify(
				fn({} as unknown as S) as unknown as S,
			);

			const persister = this.pluginStruct?.persister as PersisterContext<S>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	private async setByValue(value: SetObject<S>): Promise<void> {
		return new Promise(async (resolve) => {
			const parser = this.pluginStruct?.parser as ParserContext<S>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const stringified = parser.$$instance.stringify(value as unknown as S);

			const persister = this.pluginStruct?.persister as PersisterContext<S>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	private async setByKeyValue<K extends keyof S, V = SetObjectByKey<S, K>>(key: K, value: V) {
		return;
	}

	private async setByKeySetter<K extends keyof S, Fn = SetFnByKey<S, K>>(key: K, fn: Fn) { }

	async get<K = undefined>(): Promise<S>;
	async get<K extends keyof S, R = S[K]>(key: K): Promise<R>;
	async get<K extends keyof S, P extends undefined | K = undefined, R = P extends K ? S[P] : S>(
		prop?: P,
	): Promise<R> {
		return new Promise(async (resolve) => {
			const persister = this.pluginStruct?.persister as PersisterContext<S>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			const raw_value = await persister.$$instance.get({});

			const parser = this.pluginStruct?.parser as ParserContext<S>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const parsed = parser.$$instance.parse(raw_value.$$value);

			if (typeof prop === 'undefined') return resolve(parsed as unknown as never);
			else return resolve(parsed[prop] as unknown as never);
		});
	}
}
