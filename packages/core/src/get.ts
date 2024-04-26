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

class StoreGetImpl<S extends StoreData> extends StoreSet<S> implements StoreGet<S> {
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

export type { StoreGetGeneric } from './get.interface';
export { StoreGetImpl as StoreGet };
