import { StoreCore } from './core';
import type { StoreData } from "./globals";
import type { ParserContext } from "./parser/context";
import type { PersisterContext } from "./persister/context";
import type {
	StoreSet,
	StoreSetByFn,
	StoreSetByKeyFn,
	StoreSetByKeyValue,
	StoreSetByObject
} from "./set.interface";

class StoreSetImpl<TData extends StoreData> extends StoreCore<TData> implements StoreSet<TData> {
	set<K = undefined>(o: Partial<TData>): Promise<void>;
	set<K = undefined>(fn: StoreSetByFn<TData>): Promise<void>;
	set<K extends keyof TData, V extends StoreSetByKeyValue<TData, K>>(key: K, value: V): Promise<void>;
	set<K extends keyof TData, F extends StoreSetByKeyFn<TData, K>>(key: K, fn: F): Promise<void>;
	set<K extends keyof TData, P extends StoreSetByObject<TData> | K | StoreSetByFn<TData>, G extends StoreSetByKeyFn<TData, K> | StoreSetByKeyValue<TData, K> = P extends K ? StoreSetByKeyFn<TData, K> | StoreSetByKeyValue<TData, K> : never>(KeyOrFnOrObj: P, FnOrObj?: G | undefined): Promise<void> {
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

	private async setBySetter(fn: StoreSetByFn<TData>): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const parser = this.pluginStruct?.parser as ParserContext<TData>;
			if (typeof parser === 'undefined') {
				return reject('should have least one parser')
			}

			const stringified = parser.$$instance.stringify(
				fn({} as unknown as TData) as unknown as TData,
			);

			const persister = this.pluginStruct?.persister as PersisterContext<TData>;
			if (typeof persister === 'undefined') {
				return reject('should have least one persister')
			}

			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	private async setByValue(value: StoreSetByObject<TData>): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const parser = this.pluginStruct?.parser as ParserContext<TData>;
			if (typeof parser === 'undefined') {
				return reject('should have least one parser');

			}

			const stringified = parser.$$instance.stringify(value as unknown as TData);

			const persister = this.pluginStruct?.persister as PersisterContext<TData>;
			if (typeof persister === 'undefined') {
				return reject('should have least one persister');

			}

			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	private async setByKeyValue<K extends keyof TData, V = StoreSetByKeyValue<TData, K>>(key: K, value: V) {
		return;
	}

	private async setByKeySetter<K extends keyof TData, Fn = StoreSetByKeyFn<TData, K>>(key: K, fn: Fn) { }
}

export type { StoreSetGeneric } from './set.interface';
export { StoreSetImpl as StoreSet };
