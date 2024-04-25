import { StoreCore } from './core';
import type { StoreData } from "./globals";
import type { ParserContext } from "./parser/mod";
import type { PersisterContext } from "./persister/mod";
import type { StoreSet, StoreSetByFn, StoreSetByKeyFn, StoreSetByKeyValue, StoreSetByObject } from "./set.interface";

export class StoreSetImpl<S extends StoreData> extends StoreCore<S> implements StoreSet<S> {
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

	private async setByKeyValue<K extends keyof S, V = StoreSetByKeyValue<S, K>>(key: K, value: V) {
		return;
	}

	private async setByKeySetter<K extends keyof S, Fn = StoreSetByKeyFn<S, K>>(key: K, fn: Fn) { }
}
