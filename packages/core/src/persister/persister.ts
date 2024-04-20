export interface Persister<Value extends object> {
	set<TValue extends string, TKey extends string>(tag: {
		$$value: TValue;
		$$key?: TKey;
	}): Promise<void>;
	get<TValue extends string, TKey extends string>(tag: {
		$$key?: TKey;
	}): Promise<{ $$value: TValue }>;
}
