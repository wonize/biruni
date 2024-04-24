import type { SetFnByKey, SetObjectByKey } from './generic';
import type { FnValue, FnWhole, KeyList, KeyRecord, StoreGetByKeyResult, StoreGetByKeysResult, StoreGetByObjectResult, StoreGetByWholeResult } from './get';
import type { ParserContext } from './parser/context';
import type { PersisterContext } from './persister/context';
import type { PluginStruct } from './plugin/struct';
import type { StoreSetByFn, StoreSetByKeyFn, StoreSetByKeyValue, StoreSetByObject } from './set';
import type { Store } from './store';

export class Core<S extends Record<string, unknown>> implements Store<S> {
	public constructor(
		private initializer: () => S,
		private pluginStruct: PluginStruct<S>,
	) {
		this.setByValue(this.initializer());
	}

	set<K = undefined>(o: Partial<S>): Promise<void>;
	set<K = undefined>(fn: StoreSetByFn<S>): Promise<void>;
	set<K extends keyof S, V extends StoreSetByKeyValue<S, K>>(key: K, value: V): Promise<void>;
	set<K extends keyof S, F extends StoreSetByKeyFn<S, K>>(key: K, fn: F): Promise<void>;
	set<K extends keyof S, P extends StoreSetByObject<S> | K | StoreSetByFn<S>, G extends StoreSetByKeyFn<S, K> | StoreSetByKeyValue<S, K> = P extends K ? StoreSetByKeyFn<S, K> | StoreSetByKeyValue<S, K> : never>(KeyOrFnOrObj: P, FnOrObj?: G | undefined): Promise<void> {
		if (typeof KeyOrFnOrObj === 'string') {
			if (typeof FnOrObj === 'function') {
				return this.setByKeySetter(KeyOrFnOrObj, FnOrObj);
			}
			return this.setByKeyValue(KeyOrFnOrObj, FnOrObj);
		}
		else if (typeof KeyOrFnOrObj === 'function') {
			return this.setBySetter(KeyOrFnOrObj);
		}
		else if (typeof KeyOrFnOrObj === 'object') {
			return this.setByValue(KeyOrFnOrObj);
		}

		else throw new Error('not match of '.concat(typeof KeyOrFnOrObj))
	}

	private async setBySetter(fn: StoreSetByFn<S>): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const parser = this.pluginStruct?.parser as ParserContext<S>;
			if (typeof parser === 'undefined') {
				return reject('should have least one parser')
			}

			const stringified = parser.$$instance.stringify(
				fn({} as unknown as S) as unknown as S,
			);

			const persister = this.pluginStruct?.persister as PersisterContext<S>;
			if (typeof persister === 'undefined') {
				return reject('should have least one persister')
			}

			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	private async setByValue(value: StoreSetByObject<S>): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const parser = this.pluginStruct?.parser as ParserContext<S>;
			if (typeof parser === 'undefined') {
				return reject('should have least one parser');

			}

			const stringified = parser.$$instance.stringify(value as unknown as S);

			const persister = this.pluginStruct?.persister as PersisterContext<S>;
			if (typeof persister === 'undefined') {
				return reject('should have least one persister');

			}

			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	private async setByKeyValue<K extends keyof S, V = SetObjectByKey<S, K>>(key: K, value: V) {
		return;
	}

	private async setByKeySetter<K extends keyof S, Fn = SetFnByKey<S, K>>(key: K, fn: Fn) { }

	get<K = undefined>(): Promise<StoreGetByWholeResult<S>>;
	get<K extends keyof S>(key: K): Promise<StoreGetByKeyResult<S, K>>;
	get<K extends keyof S, L extends KeyList<S>>(keys: L): Promise<StoreGetByKeysResult<S, L>>;
	get<K extends keyof S, O extends KeyRecord<S>>(o: O): Promise<StoreGetByObjectResult<S, O>>;
	get<K extends keyof S, F extends FnValue<S, K> = FnValue<S, K>>(key: K, fn: F): Promise<ReturnType<F>>;
	get<K extends keyof S, F extends FnWhole<S>>(fn: F): Promise<ReturnType<F>>;
	get<
		K extends keyof S,
		P extends KeyList<S> | KeyRecord<S> | FnWhole<S>,
		R extends
		P extends KeyList<S>
		? StoreGetByKeysResult<S, P>
		: P extends KeyRecord<S>
		? StoreGetByObjectResult<S, P>
		: P extends FnWhole<S>
		? ReturnType<P> :
		never
		= P extends KeyList<S>
		? StoreGetByKeysResult<S, P>
		: P extends KeyRecord<S>
		? StoreGetByObjectResult<S, P>
		: P extends FnWhole<S>
		? ReturnType<P> :
		never
	>(keyOrKeysOrObjOrFn?: P | undefined, fn?: FnValue<S, K> | undefined): Promise<R> {
		return new Promise(async (resolve, reject) => {
			const persister = this.pluginStruct?.persister as PersisterContext<S>;
			if (typeof persister === 'undefined') {
				return reject('should have least one persister');
			}

			const raw_value = await persister.$$instance.get({});

			const parser = this.pluginStruct?.parser as ParserContext<S>;
			if (typeof parser === 'undefined') {
				return reject('should have least one parser');
			}

			const value = parser.$$instance.parse(raw_value.$$value) as Readonly<S>;

			if (typeof keyOrKeysOrObjOrFn === 'string') {
				const key = keyOrKeysOrObjOrFn as K;
				if (typeof fn === 'function') {
					return resolve(fn(value[key]) as R);
				}
				else {
					return resolve(value[key] as R);
				}
			}
			else if (typeof keyOrKeysOrObjOrFn === 'function') {
				return resolve(keyOrKeysOrObjOrFn(value) as R);
			}
			else if (typeof keyOrKeysOrObjOrFn === 'object') {
				if (keyOrKeysOrObjOrFn === null) { }
				else if (keyOrKeysOrObjOrFn instanceof Array) {
					const result = keyOrKeysOrObjOrFn.reduce((o, key) => {
						return Object.assign({}, o, { [key]: value[key] });
					}, {});
					return resolve(result as R);
				}
				else {
					const result = Object.keys(keyOrKeysOrObjOrFn).reduce((o, key) => {
						return keyOrKeysOrObjOrFn[key] === true
							? Object.assign({}, o, { [key]: value[key] })
							: Object.assign({}, o);
					}, {});
					return resolve(result as R);
				}
			}

			return reject('cannot resolve selector in <get> method')
		});
	}
}
