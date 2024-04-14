import type { Context, CoreContext } from "./context";

export type Fn<C extends Context<string>> = <T extends object>() => C;

export interface CoreChain<T extends object> {
	plug(handler: Fn<CoreContext<T>>): CoreChain<T>;
	init<TValue extends T>(initializer: () => TValue): void;
}
