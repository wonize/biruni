import type {
	FnValue,
	FnWhole,
	KeyList,
	KeyRecord,
	StoreGet,
	StoreGetByKeyResult,
	StoreGetByKeysResult,
	StoreGetByObjectResult,
	StoreGetByWholeResult
} from "./get.interface";
import type { StoreData } from "./globals";
import type { ParserContext } from "./parser/context";
import type { PersisterContext } from "./persister/context";
import { StoreSet } from "./set";

class StoreGetImpl<TData extends StoreData> extends StoreSet<TData> implements StoreGet<TData> {
	get<K = undefined>(): Promise<StoreGetByWholeResult<TData>>;
	get<K extends keyof TData>(key: K): Promise<StoreGetByKeyResult<TData, K>>;
	get<K extends keyof TData, L extends KeyList<TData>>(keys: L): Promise<StoreGetByKeysResult<TData, L>>;
	get<K extends keyof TData, O extends KeyRecord<TData>>(o: O): Promise<StoreGetByObjectResult<TData, O>>;
	get<K extends keyof TData, F extends FnValue<TData, K> = FnValue<TData, K>>(key: K, fn: F): Promise<ReturnType<F>>;
	get<K extends keyof TData, F extends FnWhole<TData>>(fn: F): Promise<ReturnType<F>>;
	get<
		K extends keyof TData,
		P extends KeyList<TData> | KeyRecord<TData> | FnWhole<TData>,
		R extends
		P extends KeyList<TData>
		? StoreGetByKeysResult<TData, P>
		: P extends KeyRecord<TData>
		? StoreGetByObjectResult<TData, P>
		: P extends FnWhole<TData>
		? ReturnType<P> :
		never
		= P extends KeyList<TData>
		? StoreGetByKeysResult<TData, P>
		: P extends KeyRecord<TData>
		? StoreGetByObjectResult<TData, P>
		: P extends FnWhole<TData>
		? ReturnType<P> :
		never
	>(keyOrKeysOrObjOrFn?: P | undefined, fn?: FnValue<TData, K> | undefined): Promise<R> {
		return new Promise(async (resolve, reject) => {
			const persister = this.pluginStruct?.persister as PersisterContext<TData>;
			if (typeof persister === 'undefined') {
				return reject('should have least one persister');
			}

			const raw_value = await persister.$$instance.get({});

			const parser = this.pluginStruct?.parser as ParserContext<TData>;
			if (typeof parser === 'undefined') {
				return reject('should have least one parser');
			}

			const value = parser.$$instance.parse(raw_value.$$value) as Readonly<TData>;

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

export type { StoreGetGeneric } from './get.interface';
export { StoreGetImpl as StoreGet };
