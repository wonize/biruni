import type { Context } from "./context";

export interface PersistenceCore<Value extends object> {
	set<TValue extends Value, TKey extends string>(tag: { $$value: TValue, $$key: TKey }): Promise<void>;
	get<TValue extends Value, TKey extends string>(tag: { $$key: TKey }): Promise<{ $$value: TValue }>;
}

export interface PersistenceContext<Value extends object> extends Context<'persistence'> {
	$$type: 'persistence';
	$$instance: PersistenceCore<Value>
}
